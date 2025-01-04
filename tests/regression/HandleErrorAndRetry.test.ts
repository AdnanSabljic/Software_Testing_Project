import { test, expect } from '@playwright/test';
import { ErrorPage } from '../../page-objects/ErrorPage';

test('Functional Test: Handle error and retry action', async ({ page }) => {
    const errorPage = new ErrorPage(page);
    await errorPage.navigateTo('https://www.saucedemo.com/error-simulation'); // Adjust as needed

    const errorDisplayed = await errorPage.isErrorDisplayed();
    expect(errorDisplayed).toBeTruthy();

    await errorPage.retryAction();
    const isRetrySuccessful = await page.url() !== 'https://www.saucedemo.com/error-simulation';

    expect(isRetrySuccessful).toBeTruthy();
});
