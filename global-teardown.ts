import { chromium } from "@playwright/test";
import { LoginPage } from "./advancedPom/pages/LoginPage";
import { HeaderPage } from "./advancedPom/pages/HeaderPage";

let header: HeaderPage;
let loginPage: LoginPage;

async function globalSetup() {
  const newBrowser = await chromium.launch({ headless: false });
  await newBrowser.newPage().then(async (page) => {
    loginPage = new LoginPage(page);
    header = new HeaderPage(page);
  });
  await loginPage.goToPage("https://www.automationexercise.com");
  await loginPage.loginWithGivenEmailAndPassword(
    process.env.EMAIL,
    process.env.PASSWORD,
  );
  await header.clickOnDeleteAccount();

  await newBrowser.close();
}

export default globalSetup;
