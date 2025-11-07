import { test, expect } from '@playwright/test';

test('Admin panel navigation test', async ({ page }) => {
  // Go to login page
  await page.goto('http://65.20.77.230:3600/', { waitUntil: 'networkidle' });

  // Login
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('pushkar@freemycost.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Click the side buttons three times (maybe menu toggle or collapse)
  const sideButton = page.getByRole('complementary').locator('div').getByRole('button');
  for (let i = 0; i < 3; i++) {
    await sideButton.click();
    await page.waitForTimeout(500);
  }

  // Sequentially click sidebar links
  await page.getByRole('link', { name: 'Users' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Products' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Orders' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Support Staff' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Support Tickets' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Payments' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Cashback' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Chat' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Settings' }).click();
  await page.waitForTimeout(1000);

  console.log('✅ Admin panel navigation test completed successfully.');
});
