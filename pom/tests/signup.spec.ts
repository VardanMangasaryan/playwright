import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";

const email = "aa@dum.dumm";
const name = "dummyName";

test("Sign Up with valid data", async ({ page }) => {
  const loginPage = new LoginPage(page);

  const signupPage = new SignupPage(page);

  await loginPage.goToPage();
  await loginPage.signupWithGivenEmailAndName(email, name);

  await expect(signupPage.name).toHaveValue(name);
  await expect(signupPage.email).toBeDisabled();
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
