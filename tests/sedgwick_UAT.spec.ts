import { test, expect } from '../fixtures/fixtures';

test.describe("Submit claim in Sedgwick", () => {

    test("1. Open Sedgwick QA1 @sanity @regression", async ({ homePage,page }) => {
        await homePage.openURL();
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
        await homePage.loginCredentials();
        await expect(page.getByText('You are currently logged into', { exact: true })).toBeVisible()
    });

    test("2. Start Intake @regression", async ({ homePage,page,startIntake }) => {
        await homePage.openURL();
        await homePage.loginCredentials();
        await startIntake.startIntakes()
        await startIntake.selectClients()
    })

})