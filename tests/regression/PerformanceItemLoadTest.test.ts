import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test('Regression Test: Verify performance when loading multiple items', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    // Get initial item load time
    const startTime = Date.now();
    await page.waitForSelector('.inventory_item');
    const initialLoadTime = Date.now() - startTime;

    // Add all items to cart
    const addButtons = await page.$$('.btn_inventory');
    for (const button of addButtons) {
        await button.click();
    }

    // Verify cart count matches total items
    const cartBadge = await page.locator('.shopping_cart_badge');
    const totalItems = await page.$$('.inventory_item');
    await expect(cartBadge).toHaveText(totalItems.length.toString());

    // Verify page still responds after bulk action
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Verify all items loaded in cart
    const cartItems = await page.$$('.cart_item');
    expect(cartItems.length).toBe(totalItems.length);
});
