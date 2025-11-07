export async function safeClick(locator, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      await locator.waitFor({ state: 'visible', timeout: 8000 });
      await locator.click();
      console.log(`✅ Clicked: ${locator}`);
      return;
    } catch {
      console.log(`⏳ Retry ${i + 1}: waiting for ${locator}`);
      await locator.page().waitForTimeout(delay);
    }
  }
  throw new Error(`❌ Failed to click after ${retries} retries: ${locator}`);
}

export async function waitForText(page, text, timeout = 15000) {
  await page.waitForSelector(`text=${text}`, { timeout });
}
