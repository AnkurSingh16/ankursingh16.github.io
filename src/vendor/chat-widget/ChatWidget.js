import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { readSse } from './sse.js';
const STATE_NOTES = {
    INSUFFICIENT_EVIDENCE: 'Not found in the documents',
    OUT_OF_SCOPE: 'Outside what this assistant covers',
    REFUSED: 'Declined',
};
// Citation markers as the server emits them in the answer text, for example [c1a2b3c].
const CITATION_MARKER = /\s*\[(c[0-9a-f]{6})\]/g;
function isWebLink(uri) {
    return /^https?:\/\//.test(uri);
}
/**
 * Replaces citation markers with superscript numbers and lists the cited sources under the answer,
 * numbered in the order they first appear. A number links to its source when the source is a web
 * address; other sources are shown as text.
 */
function Answer({ text, citations }) {
    const byId = new Map(citations.map((citation) => [citation.citationId, citation]));
    const order = [];
    for (const match of text.matchAll(CITATION_MARKER)) {
        const id = match[1] ?? '';
        if (byId.has(id) && !order.includes(id))
            order.push(id);
    }
    const pieces = [];
    let cursor = 0;
    for (const match of text.matchAll(CITATION_MARKER)) {
        const index = match.index;
        pieces.push(text.slice(cursor, index));
        cursor = index + match[0].length;
        const id = match[1] ?? '';
        const citation = byId.get(id);
        if (citation === undefined)
            continue;
        const number = order.indexOf(id) + 1;
        pieces.push(_jsx("sup", { className: "cw-footnote-ref", children: isWebLink(citation.sourceUri) ? (_jsx("a", { href: citation.sourceUri, target: "_blank", rel: "noopener noreferrer", children: number })) : (number) }, `${index}-${id}`));
    }
    pieces.push(text.slice(cursor));
    return (_jsxs(_Fragment, { children: [_jsx("p", { className: "cw-text", children: pieces }), order.length > 0 && (_jsx("ol", { className: "cw-footnotes", "aria-label": "Sources", children: order.map((id) => {
                    const citation = byId.get(id);
                    if (citation === undefined)
                        return null;
                    return (_jsxs("li", { title: citation.excerpt, children: [citation.title, ' ', _jsx("span", { className: "cw-source", children: isWebLink(citation.sourceUri) ? (_jsx("a", { href: citation.sourceUri, target: "_blank", rel: "noopener noreferrer", children: citation.sourceUri })) : (citation.sourceUri) })] }, id));
                }) }))] }));
}
const ERROR_TEXT = {
    rate_limited: 'Too many messages. Wait a minute and try again.',
    budget_exceeded: 'The daily message limit has been reached. Try again tomorrow.',
    provider_unavailable: 'The assistant is unavailable right now. Try again shortly.',
    not_found: 'This assistant has no documents yet.',
};
class ChatRequestError extends Error {
    code;
    constructor(code) {
        super(code);
        this.code = code;
    }
}
async function errorCode(response) {
    try {
        const body = (await response.json());
        return body.error?.code ?? 'internal';
    }
    catch {
        return 'internal';
    }
}
const CLOSE_MS = 220;
const HANDOFF_STATES = new Set([
    'INSUFFICIENT_EVIDENCE',
    'OUT_OF_SCOPE',
    'REFUSED',
]);
export function ChatWidget({ apiUrl, instanceId, title = 'Ask a question', contactEndpoint, defaultOpen = false, }) {
    const [phase, setPhase] = useState(defaultOpen ? 'open' : 'closed');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [busy, setBusy] = useState(false);
    const [handoffEmail, setHandoffEmail] = useState('');
    const session = useRef(undefined);
    const conversationId = useRef(undefined);
    const nextId = useRef(0);
    const closeTimer = useRef(undefined);
    const base = `${apiUrl}/v1/instances/${instanceId}`;
    useEffect(() => {
        return () => {
            clearTimeout(closeTimer.current);
        };
    }, []);
    function open() {
        clearTimeout(closeTimer.current);
        setPhase('open');
    }
    function minimise() {
        setPhase('closing');
        closeTimer.current = setTimeout(() => {
            setPhase((current) => (current === 'closing' ? 'closed' : current));
        }, CLOSE_MS);
    }
    function update(id, change) {
        setMessages((current) => current.map((message) => (message.id === id ? change(message) : message)));
    }
    async function sessionToken() {
        if (session.current !== undefined)
            return session.current;
        const response = await fetch(`${base}/session`, { method: 'POST' });
        if (!response.ok)
            throw new ChatRequestError(await errorCode(response));
        const body = (await response.json());
        session.current = body.token;
        return body.token;
    }
    async function post(message) {
        const send = async () => fetch(`${base}/chat`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'text/event-stream',
                'x-session-token': await sessionToken(),
            },
            body: JSON.stringify({ message, conversationId: conversationId.current }),
        });
        let response = await send();
        // Sessions last 24 hours and end when a dev server restarts; get a new one once.
        if (response.status === 401) {
            session.current = undefined;
            conversationId.current = undefined;
            response = await send();
        }
        if (!response.ok || response.body === null) {
            throw new ChatRequestError(await errorCode(response));
        }
        return response;
    }
    async function ask(message, replyId) {
        const response = await post(message);
        for await (const { event, data } of readSse(response.body)) {
            switch (event) {
                case 'meta':
                    conversationId.current = data.conversationId;
                    break;
                case 'token':
                    update(replyId, (m) => ({ ...m, text: m.text + data.text }));
                    break;
                case 'citation':
                    update(replyId, (m) => ({ ...m, citations: [...m.citations, data] }));
                    break;
                case 'reset':
                    // Released text failed the final check; the server sends a replacement.
                    update(replyId, (m) => ({ ...m, text: '', citations: [] }));
                    break;
                case 'final': {
                    const state = data.state;
                    update(replyId, (m) => ({
                        ...m,
                        state,
                        handoff: contactEndpoint !== undefined && HANDOFF_STATES.has(state) ? 'offer' : undefined,
                    }));
                    break;
                }
                case 'error':
                    throw new ChatRequestError(data.code);
            }
        }
    }
    async function onSubmit(event) {
        event.preventDefault();
        const message = input.trim();
        if (message === '' || busy)
            return;
        const userId = nextId.current++;
        const replyId = nextId.current++;
        setInput('');
        setBusy(true);
        setMessages((current) => [
            ...current,
            { id: userId, role: 'user', text: message, citations: [] },
            { id: replyId, role: 'assistant', text: '', citations: [], question: message },
        ]);
        try {
            await ask(message, replyId);
        }
        catch (error) {
            const code = error instanceof ChatRequestError ? error.code : 'internal';
            update(replyId, (m) => ({
                ...m,
                error: ERROR_TEXT[code] ?? 'Something went wrong. Try again.',
            }));
        }
        finally {
            setBusy(false);
        }
    }
    // Sends the visitor's own question to the site's contact endpoint. The question and the optional
    // email go in the request body, never in the URL.
    async function sendToOwner(replyId, question) {
        if (contactEndpoint === undefined)
            return;
        update(replyId, (m) => ({ ...m, handoff: 'offer' }));
        try {
            const response = await fetch(contactEndpoint, {
                method: 'POST',
                headers: { accept: 'application/json', 'content-type': 'application/json' },
                body: JSON.stringify({
                    message: question,
                    email: handoffEmail.trim() === '' ? undefined : handoffEmail.trim(),
                    source: 'chat-widget',
                    instanceId,
                }),
            });
            update(replyId, (m) => ({ ...m, handoff: response.ok ? 'sent' : 'failed' }));
        }
        catch {
            update(replyId, (m) => ({ ...m, handoff: 'failed' }));
        }
    }
    const panelOpen = phase !== 'closed';
    return (_jsxs("div", { className: "cw-root", children: [panelOpen && (_jsxs("section", { className: `cw-panel ${phase === 'closing' ? 'is-closing' : 'is-open'}`, "aria-label": "Chat", children: [_jsxs("header", { className: "cw-header", children: [_jsx("span", { className: "cw-title", children: title }), _jsx("button", { type: "button", className: "cw-icon-button", "aria-label": "Minimise chat", onClick: minimise, children: _jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: _jsx("path", { d: "M6 12h12" }) }) })] }), _jsx("ol", { className: "cw-messages", "aria-live": "polite", children: messages.map((message) => (_jsxs("li", { className: `cw-message cw-${message.role}`, children: [message.text !== '' && (_jsx(Answer, { text: message.text, citations: message.citations })), message.role === 'assistant' &&
                                    message.text === '' &&
                                    message.error === undefined && _jsx("p", { className: "cw-pending", children: "Thinking\u2026" }), message.error !== undefined && (_jsx("p", { className: "cw-error", role: "alert", children: message.error })), message.state !== undefined && STATE_NOTES[message.state] !== undefined && (_jsx("p", { className: "cw-note", children: STATE_NOTES[message.state] })), message.handoff !== undefined &&
                                    message.question !== undefined &&
                                    contactEndpoint !== undefined && (_jsx(Handoff, { status: message.handoff, email: handoffEmail, onEmail: setHandoffEmail, onSend: () => void sendToOwner(message.id, message.question ?? '') }))] }, message.id))) }), _jsx("p", { className: "cw-disclaimer", children: "This is an AI assistant and can make mistakes. Check important details against the sources." }), _jsxs("form", { className: "cw-form", onSubmit: (event) => void onSubmit(event), children: [_jsx("input", { "aria-label": "Message", value: input, maxLength: 2000, placeholder: "Ask a question", onChange: (event) => {
                                    setInput(event.target.value);
                                } }), _jsx("button", { type: "submit", disabled: busy || input.trim() === '', children: "Send" })] })] })), _jsx("button", { type: "button", className: `cw-launcher ${panelOpen ? 'is-hidden' : 'is-visible'}`, "aria-label": "Chat", "aria-expanded": panelOpen, onClick: open, children: _jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: _jsx("path", { d: "M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V16h0A2.5 2.5 0 0 1 4 13.5z" }) }) })] }));
}
function Handoff({ status, email, onEmail, onSend, }) {
    if (status === 'sent')
        return _jsx("p", { className: "cw-note", children: "Sent. Ankur will reply when he can." });
    if (status === 'failed') {
        return (_jsx("p", { className: "cw-error", role: "alert", children: "That did not send. Try the contact form on the site." }));
    }
    return (_jsxs("div", { className: "cw-handoff", children: [_jsx("p", { className: "cw-note", children: "Send this question to Ankur?" }), _jsxs("div", { className: "cw-handoff-row", children: [_jsx("input", { "aria-label": "Your email, optional", type: "email", value: email, placeholder: "Email (optional)", onChange: (event) => {
                            onEmail(event.target.value);
                        } }), _jsx("button", { type: "button", onClick: onSend, children: "Send to Ankur" })] })] }));
}
