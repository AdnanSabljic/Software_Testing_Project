import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductPage } from '../../page-objects/ProductPage';

test('Functional Test: Filter products by price (low to high)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    // Step 1: Login
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 2: Navigate to the product page
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Step 3: Sort products by price (low to high)
    await productPage.filterProducts('lohi');

    // Step 4: Wait for sorting to apply
    await page.waitForTimeout(1000); // Optional, adjust if necessary

    // Step 5: Capture and compare prices after sorting
    const pricesAfterSort = await page.$$eval('.inventory_item_price', elements => 
        elements.map(element => parseFloat(element.textContent!.replace('$', '')))
    );

    // Step 6: Check if the prices are sorted correctly
    const sortedPrices = [...pricesAfterSort].sort((a, b) => a - b);
    expect(pricesAfterSort).toEqual(sortedPrices);
}, 60000); // Increase the test timeout to 60 seconds
