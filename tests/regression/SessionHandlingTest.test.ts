// SessionHandlingTest.test.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductPage } from '../../page-objects/ProductPage';

test('Regression Test: Verify session handling and page refresh behavior', async ({ page, context }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add item to cart
    const productPage = new ProductPage(page);
    await page.click('#add-to-cart-sauce-labs-backpack');
    
    // Store cart state
    const initialCartCount = await page.locator('.shopping_cart_badge').textContent();
    
    // Simulate page refresh
    await page.reload();
    
    // Verify cart state persists after refresh
    const cartCountAfterRefresh = await page.locator('.shopping_cart_badge').textContent();
    expect(cartCountAfterRefresh).toBe(initialCartCount);
    
    // Open new tab with same site
    const newPage = await context.newPage();
    await newPage.goto('https://www.saucedemo.com/inventory.html');
    
    // Verify session is shared (user should still be logged in)
    await expect(newPage.locator('.title')).toHaveText('Products');
    
    // Verify cart state is shared across tabs
    const cartCountNewTab = await newPage.locator('.shopping_cart_badge').textContent();
    expect(cartCountNewTab).toBe(initialCartCount);
    
    // Test session persistence across navigation
    await newPage.goto('https://www.saucedemo.com/cart.html');
    await expect(newPage.locator('.cart_item')).toHaveCount(1);
    
    // Verify logout clears session in all tabs
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    
    // Original tab should be at login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    
    // Refresh second tab and verify it's also logged out
    await newPage.reload();
    await expect(newPage).toHaveURL('https://www.saucedemo.com/');
});