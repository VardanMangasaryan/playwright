import { test, expect } from "@playwright/test";

test.describe("Playwright Assertions Example", () => {
  test.describe("Positive Assertions", () => {
    test("should have the correct page title", async ({ page }) => {
      await page.goto("https://example.com");
      await expect(page).toHaveTitle("Example Domain");
    });

    test("should navigate to the correct URL", async ({ page }) => {
      await page.goto("https://example.com");
      await expect(page).toHaveURL("https://example.com/");
    });

    test("should display the heading", async ({ page }) => {
      await page.goto("https://example.com");
      const heading = page.locator("h1");
      await expect(heading).toBeVisible();
    });

    test("should contain correct heading text", async ({ page }) => {
      await page.goto("https://example.com");
      const heading = page.locator("h1");
      await expect(heading).toHaveText("Example Domain");
    });

    test("should have correct href in anchor tag", async ({ page }) => {
      await page.goto("https://example.com");
      const link = page.locator("a");
      await expect(link).toHaveAttribute(
        "href",
        "https://www.iana.org/domains/example",
      );
    });

    test("should have disabled button initially", async ({ page }) => {
      await page.goto("https://example.com");
      const button = page.locator("#submit-button");
      await expect(button).toBeDisabled();
    });

    test("should have exactly 3 list items", async ({ page }) => {
      await page.goto("https://example.com");
      const items = page.locator("ul li");
      await expect(items).toHaveCount(3);
    });

    test("should have default input value", async ({ page }) => {
      await page.goto("https://example.com");
      const input = page.locator("#name-input");
      await expect(input).toHaveValue("John Doe");
    });

    test("should have correct button color", async ({ page }) => {
      await page.goto("https://example.com");
      const button = page.locator("#submit-button");
      await expect(button).toHaveCSS("background-color", "rgb(255, 0, 0)");
    });

    test("should make an API request", async ({ page }) => {
      await page.route("https://api.example.com/data", (route) =>
        route.continue(),
      );
      await page.goto("https://example.com");
      const response = await page.waitForResponse(
        "https://api.example.com/data",
      );
      expect(response.status()).toBe(200);
    });
  });
  test.describe("Negative Assertions", () => {
    test("should not have an incorrect page title", async ({ page }) => {
      await page.goto("https://example.com");
      await expect(page).not.toHaveTitle("Wrong Title");
    });

    test("should not navigate to an incorrect URL", async ({ page }) => {
      await page.goto("https://example.com");
      await expect(page).not.toHaveURL("https://wrong-url.com/");
    });

    test("should not display a non-existing element", async ({ page }) => {
      await page.goto("https://example.com");
      const nonExistentElement = page.locator(".non-existent");
      await expect(nonExistentElement).not.toBeVisible();
    });

    test("should not contain incorrect heading text", async ({ page }) => {
      await page.goto("https://example.com");
      const heading = page.locator("h1");
      await expect(heading).not.toHaveText("Wrong Heading");
    });

    test("should not have an incorrect attribute in an anchor tag", async ({
      page,
    }) => {
      await page.goto("https://example.com");
      const link = page.locator("a");
      await expect(link).not.toHaveAttribute("href", "https://wrong-link.com");
    });

    test("should not have an enabled button when expected to be disabled", async ({
      page,
    }) => {
      await page.goto("https://example.com");
      const button = page.locator("#submit-button");
      await expect(button).not.toBeEnabled();
    });

    test("should not have more than expected list items", async ({ page }) => {
      await page.goto("https://example.com");
      const items = page.locator("ul li");
      await expect(items).not.toHaveCount(10);
    });

    test("should not have an incorrect default input value", async ({
      page,
    }) => {
      await page.goto("https://example.com");
      const input = page.locator("#name-input");
      await expect(input).not.toHaveValue("Wrong Name");
    });

    test("should not have an incorrect button color", async ({ page }) => {
      await page.goto("https://example.com");
      const button = page.locator("#submit-button");
      await expect(button).not.toHaveCSS("background-color", "rgb(0, 255, 0)"); // Ensuring it's not green
    });

    test("should not receive a failing API response", async ({ page }) => {
      await page.route("https://api.example.com/data", (route) =>
        route.continue(),
      );
      await page.goto("https://example.com");
      const response = await page.waitForResponse(
        "https://api.example.com/data",
      );
      expect(response.status()).not.toBe(500); // Ensuring no server error
    });
  });
  test.describe("Retrying", () => {
    test("Retrying until condition ", async ({ page }) => {
      await expect(async () => {
        await page.evaluate(() => {
          console.log(1);
        });
        const response = await page.request.get("https://api.example.com");
        expect(response.status()).toBe(200);
      }).toPass({
        // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe
        // ... Defaults to [100, 250, 500, 1000].
        intervals: [1_000, 2_000, 10_000],
        timeout: 60_000,
      });

      await expect
        .poll(
          async () => {
            await page.evaluate(() => {
              console.log(1);
            });
            const response = await page.request.get(
              "https://restful-booker.herokuapp.com/booking/24876784738",
            );
            return response.status();
          },
          {
            // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe
            // ... Defaults to [100, 250, 500, 1000].
            intervals: [1_000, 2_000, 10_000],
            timeout: 60_000,
          },
        )
        .toBe(200);
    });
  });
});
