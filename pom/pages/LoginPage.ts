import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly signupEmail: Locator;
  readonly signupName: Locator;
  readonly signupButton: Locator;
  readonly pageUrl = "/login";

  constructor(page: Page) {
    this.page = page;
    this.loginEmail = page.getByTestId("login-email");
    this.loginPassword = page.getByTestId("login-password");
    this.loginButton = page.getByTestId("login-button");
    this.signupEmail = page.getByTestId("signup-email");
    this.signupName = page.getByTestId("signup-name");
    this.signupButton = page.getByTestId("signup-button");
  }

  async goToPage() {
    await this.page.goto(this.pageUrl);
  }

  async fillLoginEmail(email: string) {
    await this.loginEmail.fill(email);
  }
  async fillLoginPassword(password: string) {
    await this.loginPassword.fill(password);
  }
  async clickLoginButton() {
    await this.loginButton.click();
  }
  async fillSignupEmail(email: string) {
    await this.signupEmail.fill(email);
  }
  async fillSignupName(password: string) {
    await this.signupName.fill(password);
  }
  async clickSignupButton() {
    await this.signupButton.click();
  }
  async loginWithGivenEmailAndPassword(email: string, password: string) {
    await this.fillLoginEmail(email);
    await this.fillLoginPassword(password);
    await this.clickLoginButton();
  }
  async signupWithGivenEmailAndName(email: string, name: string) {
    await this.fillSignupEmail(email);
    await this.fillSignupName(name);
    await this.clickSignupButton();
  }
}
