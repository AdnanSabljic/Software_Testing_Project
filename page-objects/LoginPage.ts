import { AbstractPage } from './AbstractPage';
import { Locator } from '@playwright/test';

export class LoginPage extends AbstractPage {
    // Locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.usernameInput = page.locator('#user-name');  // Changed from #username
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');  // Changed selector
    }
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isLoginErrorDisplayed(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }
}
