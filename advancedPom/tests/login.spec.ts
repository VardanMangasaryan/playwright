import { test } from "./baseTest";
import { expect } from "@playwright/test";

const loginCredentials = [
  {
    email: "askfjhtsk@asfs.cs",
    password: "process.env.PASSW",
  },
  {
    email: "askfjhsk@astfs.cs",
    password: "process.env.PASSW",
  },
  {
    email: "askefjhsk@asfs.cs",
    password: "process.env.PASSW",
  },
  {
    email: "askfjwhsk@asfs.cs",
    password: "process.env.PASSW",
  },
  {
    email: "askfjhersk@asfs.cs",
    password: "process.env.PASSW",
  },
];
loginCredentials.forEach((credentials) => {
  test(`Login with valid data with ${credentials.email} mail`, async ({
    loginPage,
    headerPage,
  }) => {
    await loginPage.goToPage();
    await loginPage.loginWithGivenEmailAndPassword(
      credentials.email,
      credentials.password,
    );
    await expect(headerPage.logout).toBeVisible();
    await expect(headerPage.deleteAccount).toBeVisible();
  });
});
