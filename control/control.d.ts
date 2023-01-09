declare class Control<NodeType extends HTMLElement = HTMLElement> {
    node: NodeType;
    constructor(parentNode: HTMLElement | null, tagName?: string, className?: string, content?: string, attribute?: string, type?: string);
    destroy(): void;
    setOnClick(onclick: () => void): void;
}
export default Control;
