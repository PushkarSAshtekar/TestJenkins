
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');

const safeClick = async (locator, label, { retries = 3, delay = 800 } = {}) => {
  for (let i = 0; i < retries; i++) {
    try {
      await locator.waitFor({ state: 'visible', timeout: 12_000 });
      await locator.scrollIntoViewIfNeeded();

      // Capture navigation if click causes redirect
      const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15_000 }).catch(() => null),
        locator.click({ timeout: 8_000, force: true })
      ]);

      console.log(`Clicked ${label}`);
      return response;
    } catch (e) {
      console.warn(`Retry ${i + 1}/${retries} failed for "${label}": ${e.message}`);
      if (i < retries - 1) await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error(`Failed to click "${label}" after ${retries} attempts`);
};

test.describe('FMC Intro Flow', () => {
  test('full navigation & logout', async ({ page }) => {
    test.setTimeout(240_000); // Increased for CI

    const login = new LoginPage(page);
    await login.open();
    await login.login('abc@gmail.com', 'Admin@123');
    //await page.waitForURL(/dashboard|deals|home/i, { timeout: 20_000 });

    const selectFilter = async (text) => {
      const checkbox = page.getByLabel(text, { exact: false });
      await safeClick(checkbox, `filter "${text}"`);
    };

    const clearFilters = async () => {
      const btn = page.getByRole('button', { name: /clear/i });
      if (await btn.isVisible({ timeout: 5_000 })) {
        await safeClick(btn, 'Clear Filters');
      }
    };

    // === Today's Deals ===
    await safeClick(page.getByRole('link', { name: "Today's Deals" }), "Today's Deals");
    await selectFilter('Clothing Accessories');
    await clearFilters();

    // === New ===
    await safeClick(page.getByRole('link', { name: 'New' }), 'New');
    await selectFilter('Men S Fashion');
    await clearFilters();

    // === Kids ===
    await safeClick(page.getByRole('link', { name: 'Kids' }), 'Kids');
    await selectFilter('Watches');
    await selectFilter('Computers Accessories');
    await clearFilters();

    // === Women ===
    await safeClick(page.getByRole('link', { name: 'Women' }), 'Women');
    await selectFilter('Clothing Accessories');
    await clearFilters();

    // === Men ===
    await safeClick(page.getByRole('link', { name: 'Men' }), 'Men');

    // === My Wish ===
    await safeClick(page.getByRole('link', { name: 'My Wish' }), 'My Wish');
    const wishInput = page.getByPlaceholder(/share/i);
    if (await wishInput.isVisible({ timeout: 8_000 })) {
      await wishInput.fill('Test wish from Playwright');
      await safeClick(page.getByRole('button', { name: 'Send' }), 'Send Wish');
    }

    // === My Network & Help ===
    await safeClick(page.getByRole('link', { name: 'My Network' }), 'My Network');
    await safeClick(page.getByRole('link', { name: 'Help & Support' }), 'Help & Support');

    // === Logout ===
    await safeClick(page.getByRole('button', { name: /user\s*menu/i }), 'User Menu');
    await safeClick(page.getByRole('button', { name: 'Logout' }), 'Logout');

    // === Final Screenshot ===
    await page.screenshot({
      path: 'test-results/FMC_intro_final.png',
      fullPage: true,
    });

    console.log('FMC Intro Flow completed successfully!');
  });
});