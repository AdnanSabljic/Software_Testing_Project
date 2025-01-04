import { AbstractPage } from './AbstractPage';
import { Locator } from '@playwright/test';

export class OrderHistoryPage extends AbstractPage {
    // Locators
    readonly orderHistoryLink: Locator;
    readonly orderList: Locator;
    readonly orderDetailsButton: Locator;
    readonly cancelOrderButton: Locator;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.orderHistoryLink = page.locator('#order-history-link');
        this.orderList = page.locator('.order-list');
        this.orderDetailsButton = page.locator('.order-details');
        this.cancelOrderButton = page.locator('.cancel-order');
    }

    async navigateToOrderHistory() {
        await this.orderHistoryLink.click();
    }

    async viewOrderDetails(orderId: string) {
        const orderSelector = this.orderList.locator(`text=${orderId}`);
        await orderSelector.click();
        await this.orderDetailsButton.click();
    }

    async cancelOrder(orderId: string) {
        const orderSelector = this.orderList.locator(`text=${orderId}`);
        await orderSelector.click();
        await this.cancelOrderButton.click();
    }
}
