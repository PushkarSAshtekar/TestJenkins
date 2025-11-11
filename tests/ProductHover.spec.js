// tests/hover_product.spec.js
const { test, expect } = require('@playwright/test');
import { LoginPage } from '../pages/LoginPage.js';




test.describe('Product hover – icons appear', () => {
  test('icons become visible on hover', async ({ page }) => {
    test.setTimeout(180_000); // 3 min total (CI‑safe)

    // ── 1. Open site ───────────────────────────────────────
    await page.goto('https://www.freemycost.com/', {
      waitUntil: 'networkidle',
      timeout: 90_000,
    });

     await expect(page).toHaveTitle(/freemycost/i);
  console.log("✅ Page title verified");

const login = new LoginPage(page);
  
  await login.open();
  await login.login('abc@gmail.com', 'Admin@123')
    console.log("✅ Logged in successfully");

    // ── 3. Title check ─────────────────────────────────────
   

    // ── 4. Login (compact) ─────────────────────────────────
    

    

    // ── 5. Go to Today’s Deals ─────────────────────────────
    await page.getByRole('link', { name: "Today's Deals" }).click();
    await page.waitForLoadState('networkidle', { timeout: 30_000 });

    // ── 6. Product grid – wait for at least one card ───────
    const firstCard = page
      .locator('[data-testid="product-card"], .ProductCard_productCard__glHat')
      .first();

    await firstCard.waitFor({ state: 'visible', timeout: 30_000 });

    // ── 7. Hover icons (wishlist / share / quick‑view) ─────
    const icons = {
      wishlist: firstCard.locator('[data-testid="icon-wishlist"], .ProductCard_icon__MMBkY').nth(0),
      share:    firstCard.locator('[data-testid="icon-share"],    .ProductCard_icon__MMBkY').nth(1),
      quick:    firstCard.locator('[data-testid="icon-quick"],    .ProductCard_icon__MMBkY').nth(2),
    };

    // ---- Initial hidden state --------------------------------
    for (const [name, loc] of Object.entries(icons)) {
      await expect.soft(loc).toBeHidden({ timeout: 5_000 });
    }

    // ---- Hover ----------------------------------------------
    await firstCard.hover({ timeout: 10_000 });
    // animation usually ≤ 300 ms – give a generous 2 s
    await page.waitForTimeout(500); // tiny debounce (still safe)

    // ---- Visible after hover ---------------------------------
    for (const [name, loc] of Object.entries(icons)) {
      await expect(loc, `${name} icon should appear on hover`).toBeVisible({ timeout: 8_000 });
    }
    console.log('Hover test passed – all icons visible');

    // ---- Optional: second product (consistency) -------------
    const secondCard = page
      .locator('[data-testid="product-card"], .ProductCard_productCard__glHat')
      .nth(1);

    if (await secondCard.isVisible({ timeout: 5_000 })) {
      await secondCard.hover();
      await expect(
        secondCard.locator('[data-testid="icon-wishlist"], .ProductCard_icon__MMBkY').first()
      ).toBeVisible({ timeout: 8_000 });
      console.log('Second product hover also works');
    }

    // ── 8. Final screenshot (Jenkins artifact) ─────────────
    await page.screenshot({
      path: 'test-results/hover_product_final.png',
      fullPage: true,
    });
  });
});