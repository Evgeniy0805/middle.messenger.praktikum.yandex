export function renderDOM(query: string, block: any) {
    const root = document.querySelector(query);
    if (root) {
        root.innerHTML = '';
        root.appendChild(block.getContent());
    }
}