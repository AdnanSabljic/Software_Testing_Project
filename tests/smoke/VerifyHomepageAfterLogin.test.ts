import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test('Smoke Test: Verify homepage after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    const headerText = await page.textContent('.title');
    expect(headerText).toBe('Products');
});
