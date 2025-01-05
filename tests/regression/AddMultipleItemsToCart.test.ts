import { test, expect } from '@playwright/test';
import { ProductPage } from '../../page-objects/ProductPage';
import { LoginPage } from '../../page-objects/LoginPage';

test('Functional Test: Add the same product multiple times', async ({ page }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add product twice
    await page.click('#add-to-cart-sauce-labs-backpack');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    // Verify the button changed to "Remove"
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();

    // Verify cart has only one item (no duplicates)
    const productPage = new ProductPage(page);
    await productPage.openCart();
    await expect(page.locator('.cart_item')).toHaveCount(1);
});