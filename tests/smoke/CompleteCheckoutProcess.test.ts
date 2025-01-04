import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../page-objects/CheckoutPage';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductPage } from '../../page-objects/ProductPage';
import { CartPage } from '../../page-objects/CartPage';

test('Smoke Test: Complete checkout process', async ({ page }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add product to cart
    const productPage = new ProductPage(page);
    await productPage.addProductToCart();
    
    // Go to cart and checkout
    const cartPage = new CartPage(page);
    await cartPage.openCart();
    await cartPage.proceedToCheckout();
    
    // Complete checkout
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutDetails('John', 'Doe', '12345');
    await checkoutPage.completeCheckout();
    
    // Verify order completion
    await expect(checkoutPage.confirmationMessage).toBeVisible();
});