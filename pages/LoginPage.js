import { expect } from '@playwright/test';
import { safeClick } from '../utils/waitUtils.js';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.userMenu = page.locator("//button[@aria-label='User Menu']//*[name()='svg']");
    this.emailInput = page.locator("input[id='EmailOrMobile']");
    this.continueBtn = page.locator("//button[normalize-space()='Continue']");
    this.passwordInput = page.locator("input[placeholder='Password']");
    this.signInBtn = page.locator("//button[normalize-space()='Sign in']");
  }

  async open() {
    await this.page.goto('http://147.93.96.2:2400/', { waitUntil: 'networkidle' });
    await expect(this.page).toHaveTitle(/freemycost/i);
    console.log('✅ Verified page title.');

    // === Handle Reject popups ===
    const rejectButton = this.page.getByRole('button', { name: 'Reject', exact: true });
    try {
      await rejectButton.waitFor({ state: 'visible', timeout: 0 });
      await rejectButton.click();
      console.log('✅ Clicked Reject button.');
    } catch {
      console.log('❌ Reject button never appeared.');
    }

    const rejectAllButton = this.page.getByRole('button', { name: 'Reject All', exact: true });
    try {
      await rejectAllButton.waitFor({ state: 'visible', timeout: 0 });
      await rejectAllButton.click();
      console.log('✅ Clicked Reject All button.');
    } catch {
      console.log('❌ Reject All button never appeared.');
    }
  }

  async login(email, password) {
    console.log('🔹 Starting login process...');
    await safeClick(this.userMenu);
    await this.emailInput.fill(email);
    console.log('✅ Filled email field.');

    // Click Continue
    await safeClick(this.continueBtn);
    console.log('✅ Clicked Continue button (1st attempt).');

    // Handle “Checking user...” issue — wait for password, retry if needed
    try {
      await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
      console.log('✅ Password field appeared.');
    } catch {
      console.log('⚠️ Password field not visible after 10s — retrying Continue.');
      await safeClick(this.continueBtn);

      // Wait again for password input after retry
      await this.passwordInput.waitFor({ state: 'visible', timeout: 0 });
      console.log('✅ Password field appeared after retry.');
    }

    // Fill password and sign in
    await this.passwordInput.fill(password);
    console.log('✅ Filled password field.');

    await safeClick(this.signInBtn);
    console.log('✅ Clicked Sign in button.');

    // Wait for dashboard or user menu to confirm login
    try {
      await this.page.waitForSelector("//h1[normalize-space()='Trending Recommendations']", { timeout: 30000 });
      console.log('✅ Successfully reached Dashboard.');
    } catch {
      console.log('⚠️ Could not confirm Dashboard visibility — may still be logging in.');
    }

    console.log('✅ Login process completed.');
    
  }
}

