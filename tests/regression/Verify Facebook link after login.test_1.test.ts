import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductPage } from '../../page-objects/ProductPage';

test('Regression: Verify Facebook link on homepage after login', async ({ page }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    console.log('Login successful');

    // Navigate to the product page
    const productPage = new ProductPage(page);
    await productPage.navigateTo('https://www.saucedemo.com/inventory.html');

    // Click on the Facebook link
    const facebookLink = page.locator('a[href*="facebook"]');
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        facebookLink.click()
    ]);

    // Verify the Facebook page opens
    await newPage.waitForLoadState('load');
    const facebookTitle = await newPage.title();
    expect(facebookTitle).toContain('Facebook');
});