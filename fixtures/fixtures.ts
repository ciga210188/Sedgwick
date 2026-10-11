import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { StartIntake } from '../pages/StartIntake';

type MyFixture = {
    homePage: HomePage;
    startIntake: StartIntake;
}

export const test = base.extend<MyFixture>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    startIntake: async ({ page }, use) => {
        await use(new StartIntake(page));
    }
});

test.afterEach(async ({ page, context }) => {
    if (!page.isClosed()) {
        await page.close();
    }
    if (context.pages().length === 0) {
        await context.close();
    }
});

export { expect };