import { test } from "@playwright/test";

test("API mockinag", async ({ page }) => {
  //   Mocking a network response
  await page.route("**/api/data", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Mocked Data" }),
    });
  });

  await page.goto("https://example.com");

  //   Blocking a network response
  await page.route("**/*.png", (route) => route.abort());

  //   Modifying a network request
  await page.route("**/api/data", async (route) => {
    const request = route.request();
    route.continue({
      headers: {
        ...request.headers(),
        Authorization: "Bearer fake-token",
      },
    });
  });
});
test("API mocking", async ({ page }) => {
  await page.route(
    "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users?**",
    async (route) => route.abort(),
  );
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  await page.locator('input[name="username"]').fill("Admin");
  await page.locator('input[name="password"]').fill("admin123");
  await page.locator('button[type="submit"]').click();
  await page
    .locator(".oxd-main-menu-item-wrapper", { hasText: "Admin" })
    .click();
});
