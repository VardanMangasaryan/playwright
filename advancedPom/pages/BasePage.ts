import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly pageUrl: string;

  constructor(page: Page, pageUrl: string) {
    this.page = page;
    this.pageUrl = pageUrl;
  }

  async goToPage() {
    await this.page.goto(this.pageUrl);
  }

  async reloadPage() {
    await this.page.reload();
    await this.page.waitForLoadState();
  }

  async getPageTitle() {
    return this.page.title();
  }

  async wait(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  async switchToFrame(frameSelector: string) {
    const frame = this.page.frameLocator(frameSelector);
    if (!frame) throw new Error(`Frame ${frameSelector} not found`);
    return frame;
  }

  async switchToMainFrame() {
    this.page.mainFrame();
  }

  async consoleLog(message: string) {
    await this.page.evaluate(() => {
      console.log(message);
    });
  }

  async takeScreenshot(path: string, isFullPage: boolean) {
    await this.page.screenshot({ path: path, fullPage: isFullPage });
  }
  async openNewTab() {
    return this.page.context().newPage();
  }

  async acceptAlert() {
    this.page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  }

  async dismissAlert() {
    this.page.on("dialog", async (dialog) => {
      await dialog.dismiss();
    });
  }

  async getAlertText(): Promise<string> {
    let alertText = "";
    this.page.on("dialog", async (dialog) => {
      alertText = dialog.message();
    });
    return alertText;
  }
}
