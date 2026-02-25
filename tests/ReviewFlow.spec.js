import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.setTimeout(180_000); // Increase timeout for CI

test('Review Flow', async ({ page }) => {
  const email = process.env.FMC_EMAIL || 'abc@gmail.com';
  const password = process.env.FMC_PASSWORD || 'Admin@123';

  console.log('🌐 Navigating to site...');
  await page.goto('http://147.93.96.2:2400/', {
    waitUntil: 'networkidle',
    timeout: 60_000,
  });
  console.log('✅ Navigated to site');

  const login = new LoginPage(page);
  await login.open();
  await login.login(email, password);

  console.log('🛒 Navigating to Men products...');
  await page.getByRole('link', { name: 'Men', exact: true }).click();

 console.log('✨ Hover test on first product...');
//const product = page.locator("(//div[@class='ProductCard_productCard__glHat'])[1]").first();
const productGrid = page.locator("section.recentProductsGrid_productsGrid__k2YSp");
await productGrid.waitFor({ state: "visible", timeout: 60000 });

const product = productGrid.locator("div.ProductCard_productCard__glHat").first();
await product.waitFor({ state: "visible", timeout: 30000 });

if (await product.isVisible({ timeout: 30000 })) {
  const wishlistIcon = product.locator('.ProductCard_icon__MMBkY').nth(0);
  const shareIcon = product.locator('.ProductCard_icon__MMBkY').nth(1);
  const quickViewIcon = product.locator('.ProductCard_icon__MMBkY').nth(2);

  await product.scrollIntoViewIfNeeded();
  await product.hover();
  console.log('Hovered on product, waiting for icons...');

  // Wait individually for each icon
  await wishlistIcon.waitFor({ state: 'visible', timeout: 10000 });
  await shareIcon.waitFor({ state: 'visible', timeout: 10000 });
  await quickViewIcon.waitFor({ state: 'visible', timeout: 10000 });

  console.log('✅ All hover icons are visible');

  await quickViewIcon.click();
  await page.waitForTimeout(2000);
} else {
  console.log('❌ No products found on the page.');
}

  console.log('📝 Filling review form...');
  await page.getByRole('button', { name: 'Already bought?' }).click();

  // Helper function to generate random alphanumeric string
  function randomAlphaNum(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const orderId = randomAlphaNum(4);       // 4-character random Order ID
  const trackingLink = randomAlphaNum(4);  // 4-character random Tracking Link

  console.log(`Generated Order ID: ${orderId}, Tracking Link: ${trackingLink}`);

  await page.getByRole('textbox', { name: 'Order ID' }).fill(orderId);
  await page.getByRole('textbox', { name: 'Tracking Link' }).fill(trackingLink);

  await page.getByPlaceholder('Order Date').fill('2025-12-30');
    await page.getByRole('button', { name: 'Confirm' }).click();

  // console.log('💡 Writing recommendation...');
  // await page.locator('div').filter({ hasText: 'Share Your Recommendation 💡' }).nth(5).click();
  // await page.getByRole('textbox', { name: 'Add a compelling title...' }).fill('Nice Title');
  // await page.getByRole('textbox', { name: 'Share Your Recommendation 💡' }).fill('This is a great product!');
  // await page.getByRole('button', { name: 'Publish Review' }).click();
  // console.log('✅ Review published');
  console.log('💡 Writing recommendation...');

// Wait for the review form to appear after clicking Confirm
await page.waitForTimeout(2000);

// Try to find the recommendation textarea more reliably
const recommendationBox = page.getByRole('textbox', { name: 'Share Your Recommendation 💡' });
await recommendationBox.waitFor({ state: 'visible', timeout: 30000 });
await recommendationBox.click();

await page.getByRole('textbox', { name: 'Add a compelling title...' }).fill('Nice Title');
await recommendationBox.fill('This is a great product!');
await page.getByRole('button', { name: 'Publish Review' }).click();
console.log('✅ Review published');

  console.log('🔒 Logging out...');
  const userMenuBtn = page.getByRole('button', { name: 'User Menu' });
  await userMenuBtn.waitFor({ state: 'visible', timeout: 60_000 });
  await userMenuBtn.click();

  const logoutBtn = page.getByRole('button', { name: 'Logout' });
  await logoutBtn.waitFor({ state: 'visible', timeout: 60_000 });
  await logoutBtn.click();
  console.log('✅ Logged out successfully');
});
