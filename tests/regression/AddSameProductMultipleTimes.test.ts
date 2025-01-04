import { test, expect } from '@playwright/test';
import { ProductPage } from '../../page-objects/ProductPage';

test('Functional Test: Add the same product multiple times', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigateTo('https://www.saucedemo.com/');
    
    await productPage.addProductToCart(); // Add product once
    await productPage.addProductToCart(); // Attempt to add the same product again

    await productPage.openCart();
    const cartItems = await page.locator('.cart_item');
    expect(await cartItems.count()).toBe(1); // Ensure duplicates are not added
});
