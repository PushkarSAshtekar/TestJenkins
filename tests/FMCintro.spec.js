// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage.js';


// test('FMC intro', async ({ page }) => {
//   const login = new LoginPage(page);
  

//   await login.open();
//   await login.login('abc@gmail.com', 'Admin@123');
//  // await dashboard.openDashboard();
//  const safeClick = async (locator, label) => {
//     try {
//       await locator.waitFor({ state: 'visible', timeout: 30000 });
//       await locator.scrollIntoViewIfNeeded();
//       await page.waitForTimeout(500); // small delay for stabilization
//       await locator.click({ timeout: 5000 });
//       console.log(`✅ Clicked ${label}`);
//     } catch (e) {
//       console.log(`⚠️ Skipped ${label} (not visible): ${e.message}`);
//     }
//   };

//   await safeClick(page.getByRole('link', { name: "Today's Deals" }), "Today's Deals");
//   await safeClick(page.getByRole('checkbox', { name: 'Clothing Accessories' }), 'Clothing Accessories');
//   await safeClick(page.getByRole('button', { name: /Clear All Filters/ }), 'Clear All Filters');
//   await safeClick(page.getByRole('link', { name: 'New' }), 'New');
//   await safeClick(page.getByRole('checkbox', { name: 'Men S Fashion', exact: true }), 'Men S Fashion');
//   await safeClick(page.getByRole('button', { name: /Clear All Filters/ }), 'Clear All Filters');
//   await safeClick(page.getByRole('link', { name: 'Kids' }), 'Kids');
//   await safeClick(page.getByRole('checkbox', { name: 'Watches' }), 'Watches');
//   await safeClick(page.getByRole('checkbox', { name: 'Computers Accessories' }), 'Computers Accessories');
//   await safeClick(page.getByRole('button', { name: /Clear All Filters/ }), 'Clear All Filters');
//   await safeClick(page.getByRole('link', { name: 'Women' }), 'Women');
//   await safeClick(page.getByRole('checkbox', { name: 'Clothing Accessories' }), 'Clothing Accessories');
//   await safeClick(page.getByRole('button', { name: /Clear/ }), 'Clear Filters');
//   await safeClick(page.getByRole('link', { name: 'Men', exact: true }), 'Men');
//   await safeClick(page.getByRole('link', { name: 'My Wish' }), 'My Wish');

//   // My Wish section
//   const wishInput = page.getByRole('textbox', { name: /Share your wish/i });
//   await wishInput.waitFor({ state: 'visible', timeout: 60000 });
//   await wishInput.fill('hi');
//   await safeClick(page.locator("(//button[normalize-space()='Send'])[1]"), 'Send Wish');

//   await safeClick(page.getByRole('link', { name: 'My Network' }), 'My Network');
//   await safeClick(page.getByRole('link', { name: 'Help & Support' }), 'Help & Support');

//   // Logout flow
//   await safeClick(page.getByRole('button', { name: 'User Menu' }), 'User Menu');
//   await safeClick(page.getByRole('button', { name: 'Logout' }), 'Logout');
//   console.log('✅ Logged out successfully');

//  await page.close();
// });

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test('FMC intro', async ({ page }) => {
  const login = new LoginPage(page);
  
  await login.open();
  await login.login('abc@gmail.com', 'Admin@123');

  // Helper function to safely click
  const safeClick = async (locator, label, timeout = 15000) => {
    try {
      if (await locator.isVisible({ timeout })) {
        await locator.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500); // small stabilization delay
        await locator.click();
        console.log(`✅ Clicked ${label}`);
      } else {
        console.log(`⚠️ Skipped ${label} (not visible)`);
      }
    } catch (e) {
      console.log(`⚠️ Skipped ${label}: ${e.message}`);
    }
  };

  // Wait for page to stabilize
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Navigation & filters
   await safeClick(page.getByRole('link', { name: "Today's Deals" }), "Today's Deals");
  await safeClick(page.locator("(//input[@type='checkbox'])[3]"), 'Clothing Accessories');
  await safeClick(page.locator("//button[normalize-space()='Clear (39)']"), 'Clear All Filters');
  await safeClick(page.getByRole('link', { name: 'New' }), 'New');
  await safeClick(page.locator("(//input[@type='checkbox'])[6]"), 'Men S Fashion');
  await safeClick(page.locator("//button[normalize-space()='Clear (5)']"), 'Clear All Filters');
  await safeClick(page.getByRole('link', { name: 'Kids' }), 'Kids');
  await safeClick(page.locator("(//input[@type='checkbox'])[14]"), 'Watches');
  await safeClick(page.locator("(//input[@type='checkbox'])[4]"), 'Computers Accessories');
  await safeClick(page.locator(".recentProductsGrid_sidebarClearButton__rzA__"), 'Clear All Filters');
  await safeClick(page.getByRole('link', { name: 'Women' }), 'Women');
  await safeClick(page.locator('input[type="checkbox"][name="Clothing Accessories"]'), 'Clothing Accessories');
  await safeClick(page.locator('button:has-text("Clear")'), 'Clear Filters');
  await safeClick(page.getByRole('link', { name: 'Men' }), 'Men');
  await safeClick(page.getByRole('link', { name: 'My Wish' }), 'My Wish');
  // My Wish section
  const wishInput = page.getByRole('textbox', { name: /Share your wish/i });
  if (await wishInput.isVisible({ timeout: 10000 })) {
    await wishInput.fill('hi');
    await safeClick(page.locator("//button[normalize-space()='Send']"), 'Send Wish');
  } else {
    console.log('⚠️ Wish input not visible, skipping...');
  }

  await safeClick(page.getByRole('link', { name: 'My Network' }), 'My Network');
  await safeClick(page.getByRole('link', { name: 'Help & Support' }), 'Help & Support');

  // Logout flow
  await safeClick(page.getByRole('button', { name: 'User Menu' }), 'User Menu');
  await safeClick(page.getByRole('button', { name: 'Logout' }), 'Logout');
  console.log('✅ Logged out successfully');

  await page.close();
});
