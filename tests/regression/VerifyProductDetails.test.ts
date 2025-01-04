import { test, expect } from '@playwright/test';

test('Functional Test: Verify product details page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.click('text=Sauce Labs Backpack');

    const productTitle = await page.textContent('.inventory_details_name');
    const productPrice = await page.textContent('.inventory_details_price');

    expect(productTitle).toBe('Sauce Labs Backpack');
    expect(productPrice).toBe('$29.99');
});
