import { test, expect } from '@playwright/test';
import demoblazeConfig from '../config/demoblaze.config.js';
import { HomePage } from '../pages/demoblazeHomeFunctions';
import { writeProductsToFile } from '../utils/fileWriter';

test.beforeEach(async ({ page }) => {
  await page.goto(demoblazeConfig.baseUrl);
})

test('scrape products', async ({page}) => {
  const homePage = new HomePage(page);
  const products = await homePage.getProducts();
  writeProductsToFile(products, 'data/products.txt');


})
