// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage.js';

// test.setTimeout(90_000); // Total timeout for CI



// test('Share Review', async ({ page }) => {
//   // =================================================================
//   // 1. Open site
//   // =================================================================
// // await page.goto('https://www.freemycost.com/', {
// //     waitUntil: 'networkidle',   // <-- reliable
// //     timeout: 60_000,
// //   });
// //   console.log('Navigated to freemycost.com');
// await page.goto(" http://65.20.77.230:2400/", {
//     timeout: 60000,
//     waitUntil: "domcontentloaded",
//   });
 
//   console.log("✅ Navigated to freemycost.com");


//   // =================================================================
//   // 3. Verify Title
//   // =================================================================
//   //  await expect(page).toHaveTitle(/freemycost/i);
//   // console.log("✅ Page title verified");

  
//   const login = new LoginPage(page);
    
//     await login.open();
//     await login.login('abc@gmail.com', 'Admin@123');


  

// await page.getByRole('link', { name: 'My Network' }).click();
//   await page.getByText('↗️').first().click();
//   page.once('dialog', dialog => {
//     console.log(`Dialog message: ${dialog.message()}`);
//     dialog.dismiss().catch(() => {});
//   });
//   await page.getByRole('button', { name: 'Share' }).first().click();



 
//   // =================================================================
//   // 7. Logout
//   // =================================================================
//   await page.getByRole('button', { name: 'User Menu' }).click();
//   await page.getByRole('button', { name: 'Logout' }).click();

 

//   console.log('Logged out successfully!');

 
// });

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.setTimeout(120_000); // CI / Jenkins safe timeout

test('Share Review', async ({ page }) => {
  const email = process.env.FMC_EMAIL || 'abc@gmail.com';
  const password = process.env.FMC_PASSWORD || 'Admin@123';

 
  await page.goto('http://147.93.96.2:2400/', {
    waitUntil: 'networkidle',
    timeout: 60_000,
  });
  console.log('✅ Navigated to site');

  
  const login = new LoginPage(page);
  await login.open();
  await login.login(email, password);

  const myNetworkLink = page.getByRole('link', { name: 'My Network' });
  await myNetworkLink.waitFor({ state: 'visible', timeout: 60_000 });
  await myNetworkLink.click();
  console.log('✅ Opened My Network');

  
  const shareIcon = page.getByText('↗️').first();
  await shareIcon.waitFor({ state: 'visible', timeout: 60_000 });
  await shareIcon.click();
  console.log('✅ Clicked share icon');

 
  page.once('dialog', async dialog => {
    console.log(`ℹ️ Dialog message: ${dialog.message()}`);
    await dialog.dismiss();
  });

  
  const shareBtn = page.getByRole('button', { name: 'Share' }).first();
  await shareBtn.waitFor({ state: 'visible', timeout: 60_000 });
  await shareBtn.click();
  console.log('✅ Clicked Share button');

  const userMenuBtn = page.getByRole('button', { name: 'User Menu' });
  await userMenuBtn.waitFor({ state: 'visible', timeout: 60_000 });
  await userMenuBtn.click();

  const logoutBtn = page.getByRole('button', { name: 'Logout' });
  await logoutBtn.waitFor({ state: 'visible', timeout: 60_000 });
  await logoutBtn.click();

  console.log('✅ Logged out successfully');

 
  // await page.screenshot({
  //   path: `screenshots/share-review-${Date.now()}.png`,
  //   fullPage: true,
  // });
});
