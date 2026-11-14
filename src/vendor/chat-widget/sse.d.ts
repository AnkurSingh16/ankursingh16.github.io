export interface SseEvent {
    event: string;
    data: unknown;
}
/**
 * Parses a server-sent event stream read through `fetch`. EventSource cannot send a POST body or
 * headers, so the chat API is read this way. Comment lines (pings) are skipped.
 */
export declare function readSse(body: ReadableStream<Uint8Array>): AsyncGenerator<SseEvent>;
