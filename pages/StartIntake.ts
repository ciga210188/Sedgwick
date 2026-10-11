import { expect, Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class StartIntake {
    private readonly page: Page;

    // Locators
    private readonly startIntake: Locator;
    private readonly client: Locator;
    private readonly callerFName: Locator;
    private readonly callerLName: Locator;
    private readonly nextPage: Locator;


    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.startIntake = page.getByRole('link', { name: 'START INTAKE' })
        this.client = page.getByRole('textbox', { name: 'Select Client' })
        this.callerFName = page.getByRole('textbox', { name: 'Caller First Name' })
        this.callerLName = page.getByRole('textbox', { name: 'Caller Last Name' })
        this.nextPage = page.getByRole('link', { name: '2' })
    }

    private getRequiredEnv(name: string): string {
        const value = process.env[name];
        if (!value) {
            throw new Error(`${name} must be configured in .env before running web tests.`);
        }
        return value;
    }

    async startIntakes() {
        await this.startIntake.click()
    }

    async selectClients() {
        const clientSelected = this.getRequiredEnv('SELECT_CLIENT');
        await this.client.fill(clientSelected);

        await this.client.focus()
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('Enter')

        await this.callerFName.fill('test')
        await this.callerLName.fill('test')

    }
}