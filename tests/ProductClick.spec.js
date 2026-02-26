// tests/hover_product.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

  

test.describe('Product hover – icons + Quick‑View (no HTML changes)', () => {
  test('icons appear on hover and Quick‑View form works', async ({ page }) => {
    test.setTimeout(240_000); // 4 min total

 

    // ── 2. Open site ───────────────────────────────────────
    //await page.goto('https://www.freemycost.com/', {
  //     waitUntil: 'networkidle',
  //     timeout: 90_000,
  //   });

   
   
  //    await expect(page).toHaveTitle(/freemycost/i);
  // console.log("✅ Page title verified");

  await page.goto("http://147.93.96.2:2400/", {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });
 
  console.log("✅ Navigated to freemycost.com");
const login = new LoginPage(page);
  
  await login.open();
  await login.login('abc@gmail.com', 'Admin@123')
    console.log("✅ Logged in successfully");

   

    // ── 6. Today’s Deals ───────────────────────────────────
    await page.getByRole('link', { name: "Today's Deals" }).click();
    await page.waitForLoadState('networkidle', { timeout: 30_000 });

    // ── 7. First product card (fallback to CSS‑module class) ─
   const firstCard = page
      .locator('[class*="ProductCard_productCard"]')
      .first();

    await firstCard.waitFor({ state: 'visible', timeout: 45_000 });
    if (!(await firstCard.isVisible())) {
      await page.screenshot({ path: 'test-results/no-product.png', fullPage: true });
      throw new Error('No product card found for hover test');
    }

    // ── 8. Hover icons (fallback to CSS‑module class) ───────
    const icons = {
      wishlist: firstCard.locator('[class*="ProductCard_icon"]').nth(0),
      share:    firstCard.locator('[class*="ProductCard_icon"]').nth(1),
      quick:    firstCard.locator('[class*="ProductCard_icon"]').nth(2),
    };

    // ---- Hidden before hover --------------------------------
    for (const [name, loc] of Object.entries(icons)) {
      await expect.soft(loc).toBeHidden({ timeout: 6_000 });
    }

    // ---- Hover ----------------------------------------------
    await firstCard.hover({ timeout: 12_000 });
    await page.waitForTimeout(400); // tiny debounce for CSS transition
 
    // ---- Visible after hover --------------------------------
    for (const [name, loc] of Object.entries(icons)) {
      await expect(loc, `${name} icon should appear`).toBeVisible({ timeout: 10_000 });
    }
    console.log('Hover icons verified');

    // ── 9. Click Quick‑View (third icon) ───────────────────
    // await icons.quick.click({ timeout: 10_000 });

    // // ── 10. Quick‑View modal – “Already bought?” form ───────
    // const boughtBtn = page.getByRole('button', { name: 'Already bought?' });
    // await boughtBtn.waitFor({ state: 'visible', timeout: 15_000 });
    // await boughtBtn.click();
   // await icons.quick.click({ timeout: 10_000 });

// Wait for modal to open first
// await page.waitForTimeout(9000);

// const boughtBtn = page.getByRole('button', { name: 'Already bought?' });
// await boughtBtn.waitFor({ state: 'visible', timeout: 30_000 });
// await boughtBtn.click();


//     await page.getByRole('textbox', { name: 'Order ID' }).fill('1122');
//     await page.getByRole('textbox', { name: 'Tracking Link' }).fill('1122');

// ── 9. Click Quick‑View (third icon) ───────────────────
await firstCard.scrollIntoViewIfNeeded();
await firstCard.hover({ timeout: 12_000 });
await page.waitForTimeout(500);

// Re-locate quick icon after hover to avoid stale reference
const quickIcon = firstCard.locator('[class*="ProductCard_icon"]').nth(3);
await quickIcon.waitFor({ state: 'visible', timeout: 10_000 });
await quickIcon.click({ force: true });

// Wait for modal to appear
await page.waitForTimeout(3000);

// Check if modal opened
const boughtBtn = page.getByRole('button', { name: 'Already bought?' });
const isBoughtVisible = await boughtBtn.isVisible().catch(() => false);

if (!isBoughtVisible) {
  // Modal didn't open, try clicking quick icon again
  console.log('Modal not opened, retrying quick view click...');
  await firstCard.hover({ timeout: 12_000 });
  await page.waitForTimeout(500);
  await quickIcon.click({ force: true });
  await page.waitForTimeout(3000);
}

await boughtBtn.waitFor({ state: 'visible', timeout: 30_000 });
await boughtBtn.click();

// Use unique IDs to avoid "already exists" error
await page.getByRole('textbox', { name: 'Order ID' }).fill('OD' + Date.now());
await page.getByRole('textbox', { name: 'Tracking Link' }).fill('TL' + Date.now());
    // Date‑time picker – ISO string for <input type="datetime-local">
    // const now = new Date();
    // now.setHours(11, 30, 0, 0);
    // const iso = now.toISOString().slice(0, 16); // "2025-11-11T11:30"
    // const dateInput = page.locator('input[placeholder="Order Date and Time"]');
    // await dateInput.fill(iso);
 await page.getByPlaceholder('Order Date').fill('2025-12-30');
  await page.getByRole('button', { name: 'Confirm' }).click();
    console.log('Quick‑View form filled');

    // ── 11. Final screenshot (Jenkins artifact) ─────────────
    // await page.screenshot({
    //   path: 'test-results/hover_quickview_final.png',
    //   fullPage: true,
    // });
  });
});