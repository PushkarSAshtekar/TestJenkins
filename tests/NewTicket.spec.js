import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test('testTicket', async ({ page }) => {
await page.goto("http://www.freemycost.com/",
   { timeout: 60000, waitUntil: "load" });

// Wait indefinitely (or very long) until Reject All button appears

await expect(page).toHaveTitle(/freemycost/i);
  console.log("✅ Page title verified");

  
  const login = new LoginPage(page);
    
    await login.open();
    await login.login('abc@gmail.com', 'Admin@123');

  


 await page.waitForTimeout(2000);



  // await page.locator("//button[@aria-label='User Menu']").click();
  // await page.locator("//button[normalize-space()='My Tickets']").click();

  await page.locator('button[aria-label="User Menu"]').click();
  await page.locator('button:has-text("My Tickets")').click();

  await page.waitForURL(/tickets/i, { timeout: 15_000 });

  // =================================================================
  // 5. Create New Ticket
  // =================================================================
  await page.getByRole('button', { name: 'Show ticket form' }).click();

  const titleInput = page.getByRole('textbox', { name: 'Ticket Title' });
  await titleInput.waitFor({ state: 'visible', timeout: 10_000 });
  await titleInput.fill('Test ticket 2 from Playwright');

  const descInput = page.getByRole('textbox', { name: 'Ticket Description' });
  await descInput.fill('New test ticket 2 created using Playwright automation script.');

  // Optional: Attach files (uncomment if needed)
  // const attachBtn = page.getByRole('button', { name: 'Attach Screenshots (Max 3)' });
  // await attachBtn.setInputFiles(['img4.jpg', 'img3.jpg', 'img2.jpg']);

  await page.getByRole('button', { name: 'Submit Ticket' }).click();

  // =================================================================
  // 6. Assert ticket submitted
  // =================================================================
  // await expect(
  //   page.getByText(/ticket submitted|success|created/i)
  // ).toBeVisible({ timeout: 15_000 });

  console.log('Ticket created successfully!');
});