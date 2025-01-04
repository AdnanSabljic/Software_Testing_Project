import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test('Functional Test: Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('invalid_user', 'wrong_password');

    expect(await loginPage.isLoginErrorDisplayed()).toBeTruthy();
});
