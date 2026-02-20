import { test, expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage.js';

test("Hover function test (stable CI version)", async ({ page }) => {
  test.setTimeout(180000); // increase test timeout to 3 mins for CI

  // Go to website
  // await page.goto("https://www.freemycost.com/", {
  //   timeout: 60000,
  //   waitUntil: "domcontentloaded",
  // });
   await page.goto(" http://147.93.96.2:2400/", {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });
 
  console.log("✅ Navigated to freemycost.com");

  // await expect(page).toHaveTitle(/freemycost/i);
  // console.log("✅ Page title verified");

const login = new LoginPage(page);
  
  await login.open();
  await login.login('abc@gmail.com', 'Admin@123');


  // Assert page title
  

  // --- Login flow ---
  

  // Wait for password input
  

  await page.waitForLoadState("networkidle");
  console.log("✅ Dashboard loaded");

  // ===== Hover Tests =====
  // Hover on logo
  const logo = page.locator("img[alt='FMC Logo']");
  if (await logo.isVisible().catch(() => false)) {
    const before = await logo.evaluate(el => window.getComputedStyle(el).opacity);
    await logo.hover();
    await page.waitForTimeout(1000);
    const after = await logo.evaluate(el => window.getComputedStyle(el).opacity);
    console.log("Logo opacity changed:", before !== after);
  }

  // Hover on navigation link "New"
  const navLink = page.getByRole("link", { name: "New", exact: true });
  if (await navLink.isVisible().catch(() => false)) {
    const beforeBg = await navLink.evaluate(el => window.getComputedStyle(el).backgroundColor);
    await navLink.hover();
    await page.waitForTimeout(1000);
    const afterBg = await navLink.evaluate(el => window.getComputedStyle(el).backgroundColor);
    console.log("Nav link background changed:", beforeBg !== afterBg);
  } else {
    console.log("❌ Navigation link 'New' not found");
  }

  // Screenshot proof

});
