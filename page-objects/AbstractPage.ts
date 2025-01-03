export class AbstractPage {
    constructor(public page) {}

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async clickElement(selector: string) {
        await this.page.click(selector);
    }

    async fillInput(selector: string, value: string) {
        await this.page.fill(selector, value);
    }

    async getElementText(selector: string): Promise<string> {
        return this.page.textContent(selector) || '';
    }
}