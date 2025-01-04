import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../page-objects/CheckoutPage';

test('Functional Test: Verify confirmation page after checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.navigateTo('https://www.saucedemo.com/');
    
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#checkout');
    await checkoutPage.fillCheckoutDetails('Jane', 'Doe', '54321');
    await checkoutPage.completeCheckout();

    const confirmationMessage = await checkoutPage.isOrderComplete();
    expect(confirmationMessage).toBeTruthy();
});
