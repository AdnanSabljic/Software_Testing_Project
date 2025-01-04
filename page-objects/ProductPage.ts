import { AbstractPage } from './AbstractPage';
import { Locator } from '@playwright/test';

export class ProductPage extends AbstractPage {
    // Locators
    readonly productSortDropdown: Locator;
    readonly addToCartButton: Locator;
    readonly cartIcon: Locator;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.productSortDropdown = page.locator('.product_sort_container');
        this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
        this.cartIcon = page.locator('#shopping_cart_container');
    }

    async filterProducts(option: string) {
        await this.productSortDropdown.selectOption(option);
    }

    async addProductToCart() {
        await this.addToCartButton.click();
    }

    async openCart() {
        await this.cartIcon.click();
    }
}
