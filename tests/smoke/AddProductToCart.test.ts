import { test, expect } from '@playwright/test';
import { ProductPage } from '../../page-objects/ProductPage';
import { LoginPage } from '../../page-objects/LoginPage';

test('Smoke Test: Add a product to cart', async ({ page }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Then add product
    const productPage = new ProductPage(page);
    await productPage.addProductToCart();
    await productPage.openCart();
    
    // Verify product is in cart
    const cartItem = await page.locator('.inventory_item_name');
    await expect(cartItem).toHaveText('Sauce Labs Backpack');
});