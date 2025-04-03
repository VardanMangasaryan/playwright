import { chromium, expect } from "@playwright/test";
import { SignupPage } from "./advancedPom/pages/SignupPage";
import { LoginPage } from "./advancedPom/pages/LoginPage";

let signupPage: SignupPage;
let loginPage: LoginPage;
const name = "newNawfme";
const email = "newEmafemseil@mew.sad";
const password = "dummyPassword";

async function globalSetup() {
  const newBrowser = await chromium.launch({ headless: false });
  await newBrowser.newPage().then(async (page) => {
    signupPage = new SignupPage(page);
    loginPage = new LoginPage(page);
  });
  await loginPage.goToPage("https://www.automationexercise.com");
  await loginPage.signupWithGivenEmailAndPassword(email, name);
  await expect(signupPage.name).toHaveValue(name);
  await expect(signupPage.email).toHaveValue(email);

  await signupPage.selectMrRadioButton();
  await signupPage.fillPassword(password);
  await signupPage.fillFirstName("dummyFirstName");
  await signupPage.fillLastName("dummyLastName");
  await signupPage.fillAddress("dummyAddress");
  await signupPage.selectCountry(signupPage.COUNTRIES.INDIA);
  await signupPage.fillState("dummyhState");
  await signupPage.fillZipCode("12345678");
  await signupPage.fillCity("dummyCity");
  await signupPage.fillMobileNumber("1234567890");
  await signupPage.clickCreateAccountButton();
  await expect(signupPage.accountCreatedMessageSection).toHaveText(
    "Account Created!",
  );
  process.env.EMAIL = email;
  process.env.PASSWORD = password;
  await newBrowser.close();
}
export default globalSetup;
