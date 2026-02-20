import { test, expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage.js';


test("Verify product entered in search box is getting displayed or not", async ({ page }) => {
//   await page.goto("https://www.freemycost.com/",
//      { timeout: 60000, waitUntil: "load" });

//   // Assert page title
// await expect(page).toHaveTitle(/freemycost/i);
//   console.log("✅ Page title verified");

  await page.goto(" http://147.93.96.2:2400/", {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });
 
  console.log("✅ Navigated to freemycost.com");
  const login = new LoginPage(page);
    
    await login.open();
    await login.login('abc@gmail.com', 'Admin@123');

  // Search for "Football"
  // const searchBox = page.locator("input[placeholder='Search...']");
  // await searchBox.click();
  // await searchBox.fill("Football");
  // await page.keyboard.press("ArrowDown"); // To highlight the first suggestion
  // await page.keyboard.press("Enter");     // To select it
  // Search for "Football"
const searchBox = page.locator("//input[@placeholder='Search for anything...']");
await expect(searchBox).toBeVisible({ timeout: 10000 });
await searchBox.click();
await searchBox.fill("Football");

// Use keyboard navigation if suggestions appear
await page.keyboard.press("ArrowDown");
await page.keyboard.press("Enter");


  // Wait for search results grid
 const productGrid = page.locator("(//div[@class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'])[1]");
await expect(productGrid).toBeVisible({ timeout: 10000 });
console.log("✅ Product grid is visible");


  // Wait for at least one product card (having image inside)
  const firstProduct = productGrid.locator("div:has(img)").first();
  await firstProduct.waitFor({ state: 'visible', timeout: 10000 });

  await expect(firstProduct).toBeVisible();

  // Get all product items inside the grid
  const products = productGrid.locator("div:has(img)");
  const count = await products.count();

  console.log(`🔍 Found ${count} product(s) after searching for 'Football'`);

  // Assert that at least one product is shown
  expect(count).toBeGreaterThan(0);
});
