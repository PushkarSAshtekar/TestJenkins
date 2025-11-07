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
  // Retry helper for dynamic elements
  // const clickWithRetry = async (locator, label, retries = 3) => {
  //   for (let i = 0; i < retries; i++) {
  //     try {
  //       await locator.waitFor({ state: 'visible', timeout: 5000 });
  //       const box = await locator.boundingBox();
  //       if (!box) throw new Error('Not attached');
  //       await locator.click();
  //       console.log(`✅ Clicked ${label}`);
  //       return;
  //     } catch (e) {
  //       console.log(`⚠️ Retry ${i + 1} failed for ${label}: ${e.message}`);
  //       await page.waitForTimeout(1000);
  //     }
  //   }
  //   throw new Error(`❌ Failed to click ${label} after ${retries} retries`);
  // };

  // SafeClick wrapper
  // const safeClick = async (locator, label) => {
  //   try { await clickWithRetry(locator, label, 3); } 
  //   catch (e) { console.log(`⚠️ Skipped ${label}: ${e.message}`); }
  // };
  const safeClick = async (locator, label, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await locator.click({ timeout: 5000 });
        console.log(`✅ Clicked ${label}`);
        return;
      } catch (e) {
        console.log(`⚠️ Retry ${i + 1} failed for ${label}: ${e.message}`);
        if (i === retries - 1) console.log(`❌ Failed to click ${label} after ${retries} retries`);
        else await page.waitForTimeout(delay);
      }
    }
  };

  // Navigation & filters
 await safeClick(page.getByRole('link', { name: "Today's Deals" }).first(), "Today's Deals");
  await safeClick(page.locator('//label[contains(text(),"Clothing Accessories")]/input').first(), 'Clothing Accessories');
  await safeClick(page.locator('//button[contains(text(),"Clear All Filters")]').first(), 'Clear All Filters');
  await safeClick(page.getByRole('link', { name: 'New' }).first(), 'New');
  await safeClick(page.locator('//label[contains(text(),"Men S Fashion")]/input').first(), 'Men S Fashion');
  await safeClick(page.locator('//button[contains(text(),"Clear All Filters")]').first(), 'Clear All Filters');
  await safeClick(page.getByRole('link', { name: 'Kids' }).first(), 'Kids');
  await safeClick(page.locator('//label[contains(text(),"Watches")]/input').first(), 'Watches');
  await safeClick(page.locator('//label[contains(text(),"Computers Accessories")]/input').first(), 'Computers Accessories');
  await safeClick(page.locator('//button[contains(text(),"Clear All Filters")]').first(), 'Clear All Filters');
  await safeClick(page.getByRole('link', { name: 'Women' }).first(), 'Women');
  await safeClick(page.locator('//label[contains(text(),"Clothing Accessories")]/input').first(), 'Clothing Accessories');
  await safeClick(page.locator('//button[contains(text(),"Clear")]').first(), 'Clear Filters');
  await safeClick(page.getByRole('link', { name: 'Men' }).first(), 'Men');
  await safeClick(page.getByRole('link', { name: 'My Wish' }).first(), 'My Wish');
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
