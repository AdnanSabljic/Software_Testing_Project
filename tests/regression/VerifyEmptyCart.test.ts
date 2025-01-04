import { test, expect } from '@playwright/test';
import { CartPage } from '../../page-objects/CartPage';

test('Functional Test: Verify cart is empty after removing all products', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.navigateTo('https://www.saucedemo.com/');
    
    await page.click('#add-to-cart-sauce-labs-backpack');
    await cartPage.openCart();
    await cartPage.removeProductFromCart();

    const emptyCartMessage = await page.locator('.cart_item');
    expect(emptyCartMessage).toBeNull();
});
