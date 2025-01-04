import { test, expect } from '@playwright/test';
import { ProductPage } from '../../page-objects/ProductPage';

test('Functional Test: Filter products by price (low to high)', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigateTo('https://www.saucedemo.com/');
    await productPage.filterProducts('lohi');

    const firstProductPrice = await page.textContent('.inventory_item_price');
    expect(firstProductPrice).toBe('$7.99');
});
