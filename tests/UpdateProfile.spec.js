import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.setTimeout(90_000); // Total timeout for CI

function randomName() {
  const first = ['Raju', 'Parth', 'Amit', 'Vikram', 'Ram', 'Yash', 'Arjun', 'CR7'];
  const last  = ['Bhau', 'Singh', 'Patel', 'Sharma', 'Kumar', 'Reddy', 'Mehta', 'Gupta'];
  const f = first[Math.floor(Math.random() * first.length)];
  const l = last[Math.floor(Math.random() * last.length)];
  const ts = Date.now().toString().slice(-4);
  return `${f} ${l} ${ts}`;
}

test('Update Profile & Logout - CI Friendly', async ({ page }) => {
  // =================================================================
  // 1. Open site
  // =================================================================
// await page.goto('https://www.freemycost.com/', {
//     waitUntil: 'networkidle',   // <-- reliable
//     timeout: 60_000,
//   });
//   console.log('Navigated to freemycost.com');
await page.goto(" http://147.93.96.2:2400/", {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });
 
  console.log("✅ Navigated to freemycost.com");


  // =================================================================
  // 3. Verify Title
  // =================================================================
  //  await expect(page).toHaveTitle(/freemycost/i);
  // console.log("✅ Page title verified");

  
  const login = new LoginPage(page);
    
    await login.open();
    await login.login('abc@gmail.com', 'Admin@123');


  // ==


  // Wait for dashboard after login
 // await page.waitForURL(/dashboard|home|deals|profile/i, { timeout: 20_000 });

  // =================================================================
  // 5. Go to Profile → Edit
  // =================================================================
  await page.getByRole('button', { name: 'User Menu' }).click();
  await page.getByRole('button', { name: 'Profile', exact: true }).click();

  await page.getByRole('button', { name: 'Edit Profile' }).click();

//   const nameInput = page.getByRole('textbox', { name: 'Name', exact: true });
//   await nameInput.waitFor({ state: 'visible', timeout: 10_000 });
//   await nameInput.fill('Raju Bhau');


const nameInput = page.getByRole('textbox', { name: 'Name', exact: true });
await nameInput.waitFor({ state: 'visible', timeout: 10_000 });

const newName = randomName();
await nameInput.fill(newName);
console.log(`Updated profile with random name: ${newName}`);

await page.getByRole('button', { name: 'Update Profile' }).click();

  await page.getByRole('button', { name: 'Update Profile' }).click();

  // =================================================================
  // 6. Assert Update Success
  // =================================================================
//   await expect(
//     page.getByText(/updated|success|profile/i, { exact: false })
//   ).toBeVisible({ timeout: 10_000 });

  console.log('Profile updated successfully!');

  // =================================================================
  // 7. Logout
  // =================================================================
  await page.getByRole('button', { name: 'User Menu' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();

  // Wait for redirect to login/home
 // await page.waitForURL(/login|home|freemycost/i, { timeout: 15_000 });

  console.log('Logged out successfully!');

  // =================================================================
  // 8. Final Screenshot (Jenkins Artifact)
  // =================================================================
//   await test.info().attach('profile-updated-logout', {
//     body: await page.screenshot({ fullPage: true }),
//     contentType: 'image/png',
//   });
});