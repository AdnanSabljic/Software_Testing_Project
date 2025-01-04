import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test('Smoke Test: Logout functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    expect(await page.url()).toBe('https://www.saucedemo.com/');
});
