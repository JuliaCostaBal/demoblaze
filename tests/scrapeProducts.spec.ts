import { test, expect } from '@playwright/test';
import demoblazeConfig from '../config/demoblaze.config.js';

test.beforeEach(async ({ page }) => {
  await page.goto(demoblazeConfig.baseUrl);
})

test('open demoblaze', async ({page}) => {
  await expect(page).toHaveTitle(/STORE/);
})
