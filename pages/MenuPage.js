import { safeClick } from '../utils/waitUtils.js';

export class MenuPage {
  constructor(page) {
    this.page = page;
  }

  async openMenuItem(name) {
    const menuBtn = this.page.getByRole('button', { name });
    await safeClick(menuBtn);
    console.log(`✅ Opened menu item: ${name}`);
  }
}
