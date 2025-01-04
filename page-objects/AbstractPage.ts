import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';

export class AbstractPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async waitForElement(selector: Locator) {
        await selector.waitFor();
    }
}
