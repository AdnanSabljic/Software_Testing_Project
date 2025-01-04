import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test('Smoke Test: Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    expect(await page.url()).toContain('/inventory.html');
});
