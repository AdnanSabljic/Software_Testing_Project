import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../page-objects/CheckoutPage';
import { LoginPage } from '../../page-objects/LoginPage';
import { CartPage } from '../../page-objects/CartPage';

test('Functional Test: Verify confirmation page after checkout', async ({ page }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add product and checkout
    await page.click('#add-to-cart-sauce-labs-backpack');
    
    const cartPage = new CartPage(page);
    await cartPage.openCart();
    await cartPage.proceedToCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutDetails('Jane', 'Doe', '54321');
    await checkoutPage.completeCheckout();

    await expect(checkoutPage.confirmationMessage).toBeVisible();
});