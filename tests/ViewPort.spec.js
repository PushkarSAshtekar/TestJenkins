// tests/responsiveness.spec.js
const { test, expect } = require('@playwright/test');
import { LoginPage } from '../pages/LoginPage.js';

// Viewports to test
const viewports = [
  { name: 'Desktop', width: 1366, height: 768 },
  { name: 'Tablet',  width: 768,  height: 1024 },
  { name: 'Mobile',  width: 375,  height: 812 },
];

for (const vp of viewports) {
  test(`Check responsiveness - ${vp.name}`, async ({ page }) => {
    test.setTimeout(120_000); // CI-safe timeout

    // Set viewport
    await page.setViewportSize({ width: vp.width, height: vp.height });

    // Navigate
    await page.goto('https://www.freemycost.com/', {
      waitUntil: 'networkidle',
      timeout: 60_000,
    });

    // === Dismiss Consent Popups (Safe & Idempotent) ===
   
    
    

    // === Verify Title ===
    
await expect(page).toHaveTitle(/freemycost/i);
  console.log("✅ Page title verified");

  
  const login = new LoginPage(page);
    
    await login.open();
    await login.login('abc@gmail.com', 'Admin@123');
    // === Login ===
    

    // Wait for post-login state
   // await page.waitForURL(/dashboard|deals|home/i, { timeout: 20_000 });

    // === Responsive Assertions ===
    if (vp.name === 'Desktop') {
      // Navbar links directly visible
      await expect(page.getByRole('link', { name: 'New', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Kids', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Women', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Men', exact: true })).toBeVisible();
    }

    // if (vp.name === 'Tablet' || vp.name === 'Mobile') {
    //   // Hamburger menu visible
    //   const menuBtn = page.locator('[data-testid="hamburger-menu"], .Navbar_hamburger__s4oet, [aria-label*="menu" i]')
    //     .first();

    //   await expect(menuBtn).toBeVisible({ timeout: 15_000 });

    //   // Links hidden by default
    //   await expect(page.getByRole('link', { name: 'New', exact: true })).toBeHidden();
    //   await expect(page.getByRole('link', { name: 'Kids', exact: true })).toBeHidden();

    //   // Open menu
    //   await menuBtn.click({ force: true });

    //   // Links now visible
    //   const menuBtnn = page.getByRole('button', { name: '☰' });

    // await expect(menuBtnn).toBeVisible({ timeout: 15000 });
    // await menuBtnn.click();
    //   await expect(page.getByRole('link', { name: 'New', exact: true })).toBeVisible();
    //   await expect(page.getByRole('link', { name: 'Kids', exact: true })).toBeVisible();
    //   await expect(page.getByRole('link', { name: 'Women', exact: true })).toBeVisible();
    //   await expect(page.getByRole('link', { name: 'Men', exact: true })).toBeVisible();
    // }
    if (vp.name === 'Tablet' || vp.name === 'Mobile') {
      // === Find Hamburger Menu (Robust Fallback Chain) ===
      const menuBtn = page
        .locator(
          "(//div[@class='Navbar_hamburger__s4oet'])[1]"
        ).first();

      await expect(menuBtn).toBeVisible({ timeout: 20_000 });
      await menuBtn.click({ force: true });

      // === Verify Menu Links Appear ===
      await expect(page.getByRole('link', { name: 'New', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Kids', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Women', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Men', exact: true })).toBeVisible();

      // Optional: Close menu
      // await menuBtn.click({ force: true });
    }

    // === Screenshot with viewport name ===
    await page.screenshot({
      path: `test-results/responsiveness-${vp.name}.png`,
      fullPage: true,
    });
  });
}