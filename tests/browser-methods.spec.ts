import { chromium, firefox, test, webkit } from "@playwright/test";

test("Browser actions", async () => {
  // Browser types
  const chromeBrowser = await chromium.launch();
  const firefoxBrowser = await firefox.launch();
  const webkitBrowser = await webkit.launch();

  // Browser launch
  const chrome = await chromium.launch({ headless: false });
  const newFirefox = await firefox.launch({ headless: true });
  const newWebkit = await webkit.launch({ headless: true });

  // New page creation
  const pageOne = await chrome.newPage();
  await pageOne.goto("https://playwright.dev/");
  await pageOne.evaluate(() => {
    console.log("pageOne");
  });

  // New context creation
  const contextOne = await chromeBrowser.newContext();
  const pageSecond = await contextOne.newPage();

  const newPageForFirstContext = await contextOne.newPage();
  await newPageForFirstContext.evaluate(() => {
    console.log("newPageForFirstContext");
  });

  const contextTwo = await chromeBrowser.newContext();
  const pageTwo = await contextTwo.newPage();
  const pageThree = await contextTwo.newPage();

  await pageTwo.evaluate(() => {
    console.log("pageTwo");
  });
  await pageThree.evaluate(() => {
    console.log("pageThree");
  });

  chromeBrowser.version();
  await chromeBrowser.close();
});
