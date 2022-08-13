import Component from "./Component";

export function renderDOM(query: string, block: Component) {
    const root = document.querySelector(query);
    if (root) root.appendChild(block.getContent());
}