import { chromium, test } from "@playwright/test";

test("Element actions", async ({}) => {
  const chromeBrowser = await chromium.launch();
  const page = await chromeBrowser.newPage();
  await page.goto("https://playwright.dev/");
  const locator = page.locator("someLocator");
  await locator.click();
  await locator.click({ button: "right" });
  await locator.dblclick();
  await locator.hover();
  await locator.fill("some text");
  await locator.inputValue();
  await locator.clear();
  await locator.check();
  await locator.uncheck();
  await locator.selectOption("option");
});
