import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignupPage extends BasePage {
  readonly email: Locator;
  readonly name: Locator;
  readonly password: Locator;
  readonly mrRadioButton: Locator;
  readonly mrsRadioButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countryDropdown: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly cityInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedMessageSection: Locator;
  readonly continueButton: Locator;

  readonly COUNTRIES = {
    INDIA: "India",
    UNITED_STATES: "United States",
    CANADA: "Canada",
    AUSTRALIA: "Australia",
    ISRAEL: "Israel",
    NEW_ZEALAND: "New Zealand",
    SINGAPORE: "Singapore",
  };

  constructor(page: Page, pageUrl = "/signup") {
    super(page, pageUrl);
    this.email = page.getByTestId("email");
    this.name = page.getByTestId("name");
    this.password = page.getByTestId("password");
    this.mrRadioButton = page.getByRole("radio", { name: "Mr." });
    this.mrsRadioButton = page.getByRole("radio", { name: "Mrs." });
    this.firstNameInput = page.getByTestId("first_name");
    this.lastNameInput = page.getByTestId("last_name");
    this.addressInput = page.getByTestId("address");
    this.countryDropdown = page.getByTestId("country");
    this.stateInput = page.getByTestId("state");
    this.zipCodeInput = page.getByTestId("zipcode");
    this.cityInput = page.getByTestId("city");
    this.mobileNumberInput = page.getByTestId("mobile_number");
    this.createAccountButton = page.getByTestId("create-account");
    this.accountCreatedMessageSection = page.getByTestId("account-created");
    this.continueButton = page.getByTestId("continue-button");
  }
  async goToPage() {
    await this.page.goto(this.pageUrl);
  }
  async changeNameValue(name: string) {
    await this.name.clear();
    await this.name.fill(name);
  }
  async fillPassword(password: string) {
    await this.password.fill(password);
  }
  async selectMrRadioButton() {
    await this.mrRadioButton.check();
  }
  async selectMrsRadioButton() {
    await this.mrsRadioButton.check();
  }
  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }
  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }
  async fillAddress(address: string) {
    await this.addressInput.fill(address);
  }
  async selectCountry(country: string) {
    await this.countryDropdown.selectOption({ label: country });
  }
  async fillState(state: string) {
    await this.stateInput.fill(state);
  }
  async fillZipCode(zipCode: string) {
    await this.zipCodeInput.fill(zipCode);
  }
  async fillCity(city: string) {
    await this.cityInput.fill(city);
  }
  async fillMobileNumber(mobileNumber: string) {
    await this.mobileNumberInput.fill(mobileNumber);
  }
  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  }
  async clickContinueButton() {
    await this.continueButton.click();
  }
}
