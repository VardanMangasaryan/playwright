import { chromium, test } from "@playwright/test";

test("Context actions", async () => {
  const chromeBrowser = await chromium.launch();
  const context = await chromeBrowser.newContext();
  await context.newPage();
  await context.close();
  await context.cookies();
  await context.addCookies([{ name: "cookie", value: "value" }]);
  await context.clearCookies();
  await context.clearPermissions();
  await context.storageState();
  await context.newPage();
});
