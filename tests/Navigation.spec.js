import { test, expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage.js';

test("Navigation and Product Display Test", async ({ page }) => {
  // Go to site
  // await page.goto("http://freemycost.com/", {
  //   timeout: 60000,
  //   waitUntil: "networkidle",
  // });


  await page.goto("http://147.93.96.2:2400/", {
    waitUntil: 'networkidle',
      timeout: 90_000,
  });
 
  console.log("✅ Navigated to freemycost.com");
  // --- Handle popups safely ---

  // Assert title
 

  // --- Login sequence ---
 const login = new LoginPage(page);
  
  await login.open();
  await login.login('abc@gmail.com', 'Admin@123')

    // === 4. Login ===
    console.log('Logged in successfully');

 

  

  

  

  await page.waitForTimeout(3000);

  // --- Utility: click tab and verify products ---
  async function clickAndVerifyOnSamePage(linkName) {
    console.log(`➡️ Checking "${linkName}" section...`);
    const tab = page.getByRole("link", { name: linkName, exact: true });

    await tab.waitFor({ state: "visible", timeout: 120000 });
    await tab.click();

    const products = page.locator(
      "(//section[@class='recentProductsGrid_productsGrid__k2YSp'])[1]"
    );
    await products.waitFor({ state: "visible", timeout: 120000 });

    const count = await products.locator("div").count();
    console.log(`✅ "${linkName}" section loaded with ${count} products.`);
  }

  // --- Tabs to verify ---
  const tabNames = ["New", "Kids", "Women", "Men"];
  for (const tab of tabNames) {
    await clickAndVerifyOnSamePage(tab);
  }
});
