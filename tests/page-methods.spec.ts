import { chromium, test } from "@playwright/test";

test("Page actions", async () => {
  const chromeBrowser = await chromium.launch();
  const context = await chromeBrowser.newContext();
  const page = await context.newPage();
  await page.goto("https://playwright.dev/");
  await page.reload();
  await page.goBack();
  await page.goForward();
  await page.title();
  await page.screenshot({ path: "screenshot.png" });
  page.getByTestId("unique-element").filter();
  page.getByRole("button");
  page.getByLabel("Username");
  page.getByPlaceholder("Enter your email");
  page.getByTestId("unique-element");
  page.getByTitle("Tooltip Text");
  page.getByAltText("Sample Image");
  page.url();
});
