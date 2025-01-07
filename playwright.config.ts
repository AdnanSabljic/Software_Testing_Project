import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: [['html', { outputFolder: 'playwright-report' }]],
    testDir: './tests',
    timeout: 30000,
    retries: 1,
    use: {
        headless: true,
        baseURL: 'https://www.saucedemo.com',
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'Chromium', use: { browserName: 'chromium' } },
        { name: 'Firefox', use: { browserName: 'firefox' } },
        { name: 'WebKit', use: { browserName: 'webkit' } },
    ],
});
