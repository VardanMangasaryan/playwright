import { expect } from "@playwright/test";
import { test } from "./baseTest";

const email = "duhewdfsfmmy@dum.dumm";
const name = "dummeyxName";

test("Sign Up with valid data", async ({
  loginPage,
  signupPage,
  consoleLog,
}) => {
  await loginPage.goToPage();
  await loginPage.signupWithGivenEmailAndPassword(email, name);
  await consoleLog("Kalbas");
  await expect(signupPage.name).toHaveValue(name);
  await expect(signupPage.email).toHaveValue(email);

  await signupPage.selectMrRadioButton();
  await signupPage.fillPassword("dummyPassword");
  await signupPage.fillFirstName("dummyFirstName");
  await signupPage.fillLastName("dummyLastName");
  await signupPage.fillAddress("dummyAddress");
  await signupPage.selectCountry(signupPage.COUNTRIES.INDIA);
  await signupPage.fillState("dummyhState");
  await signupPage.fillZipCode("12345678");
  await signupPage.fillCity("dummyCity");
  await signupPage.fillMobileNumber("1234567890");
  await signupPage.clickCreateAccountButton();
  await expect(signupPage.page).toHaveScreenshot("signup.png");
  await expect(signupPage.accountCreatedMessageSection).toHaveText(
    "Account Created!",
  );
});
