import { test } from "@playwright/test";

test.only("focus this test", async ({}) => {
  // Run only focused tests in the entire project.
});

test("skip this test", async ({}) => {
  // This test is not run
  test.slow();
});
test("skip this test conditionally", async ({ browserName }) => {
  test.skip(browserName === "firefox", "Still working on it");
});

test.describe("two tests", () => {
  test("one", async ({}) => {
    // ...
  });

  test("two", async ({}) => {
    // ...
  });
});

test.describe("group", { tag: "@report" }, () => {
  test("test report header @report", async ({}) => {
    // ...
  });
  test("test full report", { tag: ["@slow", "@vrt"] }, async ({}) => {
    // ...
  });
});

test.describe(
  "report tests @group",
  { annotation: { type: "category", description: "report" } },
  () => {
    test(
      "test full report new",
      {
        annotation: [
          {
            type: "issue",
            description: "https://github.com/microsoft/playwright/issues/23180",
          },
          { type: "performance", description: "very slow test!" },
        ],
      },
      async ({}) => {
        // ...
      },
    );
  },
);
