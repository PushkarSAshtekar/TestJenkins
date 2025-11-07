import { test, expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage.js';

test("Hover function test", async ({ page }) => {
  // Go to website
  await page.goto("https://www.freemycost.com/", {
    timeout: 180000,
    waitUntil: "load",
  });
 await expect(page).toHaveTitle(/freemycost/i);
  console.log("✅ Page title verified");

const login = new LoginPage(page);
  
  await login.open();
  await login.login('abc@gmail.com', 'Admin@123');

  await page.getByRole('link', { name: "Today's Deals" }).click();

  // ===== Hover Tests on Products =====
  await page.waitForSelector("(//section[@class='recentProductsGrid_productsGrid__k2YSp'])[1]", { timeout: 10000 });

  const product = page.locator("(//div[@class='ProductCard_productCard__glHat'])[1]").first();

  if (await product.isVisible()) {
    // 🎯 FIXED: Use .locator('.ProductCard_icon__MMBkY').nth(x) for strict selector uniqueness
    const wishlistIcon = product.locator('.ProductCard_icon__MMBkY').nth(0);
    const shareIcon = product.locator('.ProductCard_icon__MMBkY').nth(1);
    const quickViewIcon = product.locator('.ProductCard_icon__MMBkY').nth(2);

    await expect(wishlistIcon, "Wishlist icon should be hidden before hover").toBeHidden();
    await expect(shareIcon, "Share icon should be hidden before hover").toBeHidden();
    await expect(quickViewIcon, "Quick view icon should be hidden before hover").toBeHidden();
    console.log("Products are hidden");
    
    // Perform hover
    await product.hover();
    await page.waitForTimeout(2000);

    // Verify icons become visible after hover
    await expect(wishlistIcon, "Wishlist icon should be visible after hover").toBeVisible({ timeout: 2000 });
    await expect(shareIcon, "Share icon should be visible after hover").toBeVisible({ timeout: 2000 });
    await expect(quickViewIcon, "Quick view icon should be visible after hover").toBeVisible({ timeout: 2000 });

    console.log("✅ Product hover test passed: Wishlist, share, and quick view icons visible on hover.");

    // Click tests
    const initialWishlistState = await wishlistIcon.evaluate((el) => el.getAttribute('aria-selected') || 'false');
    console.log("Initial wishlist state:", initialWishlistState);

    await wishlistIcon.click();
    await page.waitForTimeout(2000);

    await wishlistIcon.click();
    await page.waitForTimeout(2000);

    const product2 = page.locator("(//div[@class='ProductCard_productCard__glHat'])[2]");
    if (await product2.isVisible()) {
      await product2.hover();
      await page.waitForTimeout(2000);
      await expect(product2.locator('.ProductCard_icon__MMBkY').nth(0), "Wishlist icon should be visible on second product").toBeVisible({ timeout: 2000 });
      console.log("✅ Second product hover test passed.");
    }
  } else {
    console.log("❌ No products found on the page.");
  }
});
