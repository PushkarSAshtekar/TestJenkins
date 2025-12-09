import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

// Increase global timeout for CI slowness
test.setTimeout(90_000);

test('FreeMyCost – login → Today’s Deals → Buy Now', async ({ page }) => {
  // -------------------------------------------------
  // 1. Open the site (wait for network idle)
  // -------------------------------------------------
  // await page.goto('https://www.freemycost.com/', {
  //   waitUntil: 'networkidle',   // <-- reliable
  //   timeout: 60_000,
  // });

  await page.goto(" http://65.20.77.230:5000/", {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });
 
  console.log("✅ Navigated to freemycost.com");
  // -------------------------------------------------
  // 2. Dismiss cookie / consent pop-ups (if they appear)
  // -------------------------------------------------
  

  // -------------------------------------------------
  // 3. Verify we are on the right page
  // -------------------------------------------------
  // await expect(page).toHaveTitle(/freemycost/i);
  // console.log("✅ Page title verified");

  
  const login = new LoginPage(page);
    
    await login.open();
    await login.login('abc@gmail.com', 'Admin@123');

  // -------------------------------------------------
  // 4. Open user menu → login
  // -------------------------------------------------


  // Password step – it appears only after the “Continue” request finishes
  

  // Wait for navigation after login
 // await page.waitForURL('**/dashboard**', { timeout: 20_000 });

  // -------------------------------------------------
  // 5. Go to Today’s Deals
  // -------------------------------------------------
  await page.getByRole('link', { name: "Today's Deals" }).click();
  await page.waitForLoadState('networkidle');

  // -------------------------------------------------
  // 6. Pick the first “Buy Now” button inside a product card
  // -------------------------------------------------
 const productCard = page
    .locator('div[class*="ProductCard_productCard"]') // matches any hash
    .first();

  console.log('Waiting for product card...');
  await productCard.waitFor({ state: 'visible', timeout: 30_000 });

  // --- Scroll into view (triggers lazy load) ---
  await productCard.scrollIntoViewIfNeeded();

  // --- Click the product card to open detail ---
  console.log('Clicking product card...');
  await productCard.click({ force: true });

 // const productCard= --- Scroll into view (helps lazy loading) ---
  //await productCard.scrollIntoViewIfNeeded();

  // --- Wait for "Buy Now" button inside the card ---
  const buyNowBtn = page.locator("(//button[normalize-space()='Buy Now'])[1]");

  console.log('Waiting for "Buy Now" button...');
  await expect(buyNowBtn).toBeVisible({ timeout: 20_000 });

  // --- Click it ---
  await buyNowBtn.click({ force: true });

  //
  // -------------------------------------------------
  // 7. (Optional) Verify new tab / modal opened
  // -------------------------------------------------
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'), // captures popup
    // click already happened above
  ]);
  await newPage.waitForLoadState('domcontentloaded');
  console.log('Popup URL →', newPage.url());

  // -------------------------------------------------
  // 8. Take a screenshot on failure (Jenkins artifact)
  // -------------------------------------------------
  await test.info().attach('final-screenshot', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});