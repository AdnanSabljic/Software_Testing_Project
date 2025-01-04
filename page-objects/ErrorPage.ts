import { AbstractPage } from './AbstractPage';
import { Locator } from '@playwright/test';

export class ErrorPage extends AbstractPage {
    // Locators
    readonly errorBanner: Locator;
    readonly retryButton: Locator;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.errorBanner = page.locator('.error-banner');
        this.retryButton = page.locator('#retry');
    }

    async isErrorDisplayed(): Promise<boolean> {
        return await this.errorBanner.isVisible();
    }

    async retryAction() {
        await this.retryButton.click();
    }
}
