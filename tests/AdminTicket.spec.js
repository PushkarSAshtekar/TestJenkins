import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://65.20.77.230:3600/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('pushkar@freemycost.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('complementary').locator('div').getByRole('button').click();
  await page.getByRole('link', { name: 'Support Tickets' }).click();
  await page.getByText('🗓️ Created: 10/29/2025, 10:25:37 AM🔁 Status: OPEN👤 Assigned To: Unassigned').click();
  await page.getByRole('textbox', { name: 'Type your reply...' }).click();
  await page.getByRole('textbox', { name: 'Type your reply...' }).fill('test ticket 2 from automation');
  await page.getByRole('button', { name: 'Send Reply' }).click();
  await page.getByRole('button', { name: '📄 img4.jpg' }).click();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.getByRole('button', { name: '📄 img3.jpg' }).click();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.getByRole('button', { name: '📄 img2.jpg' }).click();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
});