// import { defineConfig } from '@playwright/test';

// export default defineConfig({
//   testDir: './tests',
//   timeout: 120000,
//   expect: { timeout: 10000 },
//   retries: 2,
//   reporter: [['list'], ['html', { open: 'never' }]],
//   use: {
//     headless: true,
//     viewport: { width: 1280, height: 720 },
//     ignoreHTTPSErrors: true,
//     video: 'retain-on-failure',
//     screenshot: 'only-on-failure',
//     actionTimeout: 10000,
//     navigationTimeout: 120000,
//   },
// });

// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Folder where all your test files are located
  timeout: 180000, // 3 minutes per test (safe for Jenkins)
  expect: {
    timeout: 30000, // Default assertion timeout
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // Prevent accidental .only in Jenkins
  retries: process.env.CI ? 2 : 0, // Retry failing tests in Jenkins
  workers: process.env.CI ? 1 : undefined, // 1 worker for Jenkins stability
  reporter: [
    ['list'],
    ['html', { open: 'never' }], // Generates HTML report
  ],
  use: {
    headless: process.env.CI ? true : false, // Headless mode in Jenkins
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: 0,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
