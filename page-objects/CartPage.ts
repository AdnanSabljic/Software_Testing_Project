import { AbstractPage } from './AbstractPage';
import { Locator } from '@playwright/test';

export class CartPage extends AbstractPage {
    // Locators
    readonly cartIcon: Locator;
    readonly removeButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.cartIcon = page.locator('#shopping_cart_container');
        this.removeButton = page.locator('#remove-sauce-labs-backpack');
        this.checkoutButton = page.locator('#checkout');
    }

    async openCart() {
        await this.cartIcon.click();
    }
    async removeProductFromCart() {
        await this.removeButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
