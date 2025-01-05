import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test('Functional Test: Verify product details page', async ({ page }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    // Navigate to product details
    await page.click('.inventory_item_name');

    const productTitle = await page.locator('.inventory_details_name');
    const productPrice = await page.locator('.inventory_details_price');

    await expect(productTitle).toHaveText('Sauce Labs Backpack');
    await expect(productPrice).toHaveText('$29.99');
});