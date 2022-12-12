class Control<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(
    parentNode: HTMLElement | null,
    tagName = "div",
    className = "",
    content = "",
    attribute = "",
    type = ""
  ) {
    const el = document.createElement(tagName);
    el.className = className;
    el.innerHTML = content;
    if (parentNode) {
      parentNode.append(el);
    }
    if (attribute) {
      el.setAttribute(attribute, type);
    }
    this.node = el as NodeType;
  }

  destroy(): void {
    this.node.remove();
  }
  setOnClick(onclick: () => void) {
    this.node.onclick = onclick;
  }
}

export default Control;
