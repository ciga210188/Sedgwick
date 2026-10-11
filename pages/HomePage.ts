import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly login: Locator;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly beginButton: Locator;
    private readonly title: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.login = page.getByRole('heading', { name: 'Login' });
        this.username = page.getByLabel('Username');
        this.password = page.getByLabel('Password');
        this.beginButton = page.getByRole('button', { name: 'BEGIN' });
        this.title = page.getByText('Multifactor Authentication');
    }

    private getRequiredEnv(name: string): string {
        const value = process.env[name];
        if (!value) {
            throw new Error(`${name} must be configured in .env before running web tests.`);
        }
        return value;
    }

    private async dismissCookieBanner(): Promise<void> {
        const acceptCookiesButton = this.page
            .locator('button')
            .filter({ hasText: /Accept All Cookies|Accept Cookies|Accept/i })
            .first();

        if (await acceptCookiesButton.count()) {
            await acceptCookiesButton.click({ force: true, timeout: 5000 }).catch(() => undefined);
        }
    }

    async openURL() {
        const APP_URL = this.getRequiredEnv('WEB_APP_URL');
        await this.page.goto(APP_URL);
    }

    async loginCredentials() {
        const user = this.getRequiredEnv('ADMIN_USERNAME');
        const pass = this.getRequiredEnv('ADMIN_PASSWORD');

        await this.username.fill(user);
        await this.password.fill(pass);
        await this.dismissCookieBanner();
        await this.beginButton.click();
    }

}