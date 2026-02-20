import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';


test.setTimeout(120_000);
test('Comment Review Flow', async ({ page }) => {
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

  //await page.getByRole('link', { name: 'My Network' }).click();
  
  await page.getByText('💬').nth(1).click();
  await page.getByRole('textbox', { name: 'Write a comment...' }).click();
  await page.getByRole('textbox', { name: 'Write a comment...' }).fill('nicee');
  await page.getByRole('button', { name: 'POST' }).click();

   const userMenuBtn = page.getByRole('button', { name: 'User Menu' });
  await userMenuBtn.waitFor({ state: 'visible', timeout: 60_000 });
  await userMenuBtn.click();

  const logoutBtn = page.getByRole('button', { name: 'Logout' });
  await logoutBtn.waitFor({ state: 'visible', timeout: 60_000 });
  await logoutBtn.click();

  console.log('✅ Logged out successfully');
  
});