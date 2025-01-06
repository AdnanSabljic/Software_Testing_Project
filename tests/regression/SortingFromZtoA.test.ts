import { test, expect } from '@playwright/test';
import { ProductPage } from '../../page-objects/ProductPage';
import { LoginPage } from '../../page-objects/LoginPage';

test('Functional Test: Sort products by name (Z to A)', async ({ page }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    // Sort products by name (Z to A)
    const productPage = new ProductPage(page);
    await productPage.filterProducts('za');

    // Get all product names
    const productNames = await page.locator('.inventory_item_name').allTextContents();
    
    // Create a sorted copy of the names array in reverse order to compare against
    const sortedNames = [...productNames].sort().reverse();
    
    // Verify the products are in reverse alphabetical order
    expect(productNames).toEqual(sortedNames);
});