import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { CartPage } from '../../page-objects/CartPage';
import { CheckoutPage } from '../../page-objects/CheckoutPage';

test('Functional Test: Complete purchase with multiple items and verify total', async ({ page }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    // Add multiple items to cart
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#add-to-cart-sauce-labs-bike-light');
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');

    // Go to cart
    const cartPage = new CartPage(page);
    await cartPage.openCart();

    // Verify cart item count
    const cartItems = await page.locator('.cart_item');
    await expect(cartItems).toHaveCount(3);

    // Get total price
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const total = prices.reduce((sum, price) => sum + parseFloat(price.replace('$', '')), 0);

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Complete checkout
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutDetails('John', 'Doe', '12345');

    // Verify the total on the checkout page
    const checkoutTotal = await page.locator('.summary_subtotal_label').textContent();
    const checkoutTotalNumber = parseFloat(checkoutTotal?.replace('Item total: $', '') || '0');
    expect(checkoutTotalNumber).toBeCloseTo(total, 2);

    // Complete the purchase
    await checkoutPage.completeCheckout();

    // Verify order completion
    await expect(checkoutPage.confirmationMessage).toBeVisible();
});