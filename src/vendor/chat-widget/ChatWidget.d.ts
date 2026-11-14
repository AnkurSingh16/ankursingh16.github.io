export interface ChatWidgetProps {
    apiUrl: string;
    instanceId: string;
    /** Heading shown in the open panel. */
    title?: string;
    /**
     * Where a question the assistant could not answer is sent, for example the site's contact form
     * endpoint. Without it, no handoff is offered.
     */
    contactEndpoint?: string;
    /** Open the panel on first render instead of showing the launcher. */
    defaultOpen?: boolean;
}
export declare function ChatWidget({ apiUrl, instanceId, title, contactEndpoint, defaultOpen, }: ChatWidgetProps): import("react").JSX.Element;
