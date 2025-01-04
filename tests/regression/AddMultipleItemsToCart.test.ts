import { test, expect } from '@playwright/test';
import { ProductPage } from '../../page-objects/ProductPage';

test('Functional Test: Add multiple products to the cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigateTo('https://www.saucedemo.com/');
    await productPage.addProductToCart();
    await page.click('#add-to-cart-sauce-labs-bike-light');

    await productPage.openCart();
    const cartItems = await page.locator('.cart_item');
    expect(await cartItems.count()).toBe(2);
});
