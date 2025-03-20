import { chromium, test } from "@playwright/test";

test("Element actions", async ({}) => {
  const chromeBrowser = await chromium.launch();
  const page = await chromeBrowser.newPage();

  await page.waitForSelector("#success-msg", { state: "visible" });
  await page.waitForSelector("#loading-spinner", { state: "hidden" });
  await page.waitForSelector("button#submit:not([disabled])");
  await page.waitForResponse(
    (response) =>
      response.url().includes("/api/user") && response.status() === 200,
  );
  await page.waitForRequest("**/api/data");
  await page.waitForFunction(
    () => document.querySelector("#cart-count").textContent === "3",
  );
});
