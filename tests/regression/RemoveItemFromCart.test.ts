import { test, expect } from '@playwright/test';
import { CartPage } from '../../page-objects/CartPage';

test('Functional Test: Remove product from cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.navigateTo('https://www.saucedemo.com/');
    await page.click('#add-to-cart-sauce-labs-backpack');
    await cartPage.openCart();
    await cartPage.removeProductFromCart();

    const cartItems = await page.locator('.cart_item');
    expect(await cartItems.count()).toBe(0);
});
