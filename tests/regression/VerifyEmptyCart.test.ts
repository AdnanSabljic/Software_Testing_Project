import { test, expect } from '@playwright/test';
import { CartPage } from '../../page-objects/CartPage';
import { LoginPage } from '../../page-objects/LoginPage';

test('Functional Test: Verify cart is empty after removing all products', async ({ page }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add product to cart
    await page.click('#add-to-cart-sauce-labs-backpack');
    
    // Verify cart badge shows 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    // Remove product from cart
    const cartPage = new CartPage(page);
    await cartPage.openCart();
    await cartPage.removeProductFromCart();

    // Verify cart is empty
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('.cart_item')).not.toBeVisible();
});