import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HeaderPage extends BasePage {
  readonly home: Locator;
  readonly products: Locator;
  readonly cart: Locator;
  readonly logout: Locator;
  readonly deleteAccount: Locator;

  constructor(page: Page, pageUrl = "") {
    super(page, pageUrl);
    this.home = page.locator("a", { hasText: "Home" });
    this.products = page.locator("a", { hasText: "Products" });
    this.cart = page.locator("a", { hasText: "Cart" });
    this.logout = page.locator("a", { hasText: "Logout" });
    this.deleteAccount = page.locator("a", { hasText: "Delete Account" });
  }

  async clickOnDeleteAccount() {
    await this.deleteAccount.click();
  }
}
