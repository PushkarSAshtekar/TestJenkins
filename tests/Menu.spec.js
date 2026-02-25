// tests/freemycost_dashboard.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('FreeMyCost - Full Dashboard Navigation', () => {
  test('navigate through all user menu sections', async ({ page }) => {
    test.setTimeout(300_000); // 5 min total (CI-safe)

    // === 1. Go to site ===
    // await page.goto('https://www.freemycost.com/', {
    //   waitUntil: 'networkidle',
    //   timeout: 90_000,
    // });


     await page.goto("http://147.93.96.2:2400/", {
    waitUntil: 'networkidle',
      timeout: 90_000,
  });
 
  console.log("✅ Navigated to freemycost.com");
    // === 2. Dismiss consent popups (idempotent) ===
    
    // === 3. Verify title ===
  //    await expect(page).toHaveTitle(/freemycost/i);
  // console.log("✅ Page title verified");

const login = new LoginPage(page);
  
  await login.open();
  await login.login('abc@gmail.com', 'Admin@123')

    // === 4. Login ===
    console.log('Logged in successfully');

    // === 5. Reusable: Open User Menu + Click Item ===
    const goToMenu = async (menuName, postWaitSelector = null) => {
      console.log(`Navigating to: ${menuName}`);

      // Open menu
      await page.getByRole('button', { name: /user menu/i }).click();
      await page.waitForTimeout(600); // tiny debounce

      // Click menu item
      const item = page.getByRole('button', { name: menuName, exact: false });
      await item.waitFor({ state: 'visible', timeout: 12_000 });
      await item.scrollIntoViewIfNeeded();
      await item.click();

      // Wait for section to load
      if (postWaitSelector) {
        await page.waitForSelector(postWaitSelector, { timeout: 20_000 });
      } else {
        await page.waitForLoadState('networkidle', { timeout: 20_000 });
      }

      console.log(`Entered: ${menuName}`);
    };

    // === 6. Navigate All Sections ===
    await goToMenu('Notifications');
    await page.locator('header svg').first().click(); // back

    await goToMenu('Orders', 'text=My Orders');
    await page.locator('div').filter({ hasText: 'My Orders' }).nth(4).click();
    await page.locator('header svg').first().click(); // back

    await goToMenu('Reviews');
    await page.locator('header svg').first().click();

    await goToMenu('Wallet History');
    await page.locator('header svg').first().click();

    await goToMenu('My Earnings');
    await page.locator('header svg').first().click();

    await goToMenu('Chats'); // or '💬 Chats'
    await page.locator('header svg').first().click();

    await goToMenu('Profile');
    await page.locator('header svg').first().click();

    await goToMenu('My Tickets');
    await page.locator('header svg').first().click();

    // === 7. Final Screenshot ===
    await page.screenshot({
      path: 'test-results/dashboard_full_flow.png',
      fullPage: true,
    });

    console.log('All dashboard sections verified!');
  });
});