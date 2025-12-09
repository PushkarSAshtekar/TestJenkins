import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';


test('User can log in and access dashboard', async ({ page }) => {
  const login = new LoginPage(page);
  

  await login.open();

  
  await login.login('abc@gmail.com', 'Admin@123');
 // await dashboard.openDashboard();

 await page.close();
});
