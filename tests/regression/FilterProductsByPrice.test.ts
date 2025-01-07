import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test('Functional Test: Filter products by price (low to high)', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 1: Sort products by price (low to high)
    await page.selectOption('.product_sort_container', 'lohi');

    // Step 2: Wait for sorting to apply
    await page.waitForTimeout(1000); // Optional, adjust if necessary

    // Step 3: Capture and compare prices after sorting
    const pricesAfterSort = await page.$$eval('.inventory_item_price', elements => 
        elements.map(element => parseFloat(element.textContent!.replace('$', '')))
    );

    // Step 4: Check if the prices are sorted correctly
    const sortedPrices = [...pricesAfterSort].sort((a, b) => a - b);
    expect(pricesAfterSort).toEqual(sortedPrices);
});
