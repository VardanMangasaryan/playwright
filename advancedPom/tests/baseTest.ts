import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";

export const test = base.extend<{
  loginPage: LoginPage;
  signupPage: SignupPage;
  consoleLog: (message: string) => Promise<void>;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  consoleLog: async ({ page }, use) => {
    await use(async (message: string) => {
      await page.evaluate((message) => {
        console.log(message);
      }, message);
    });
  },
});
