import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage/homePage';
import { writeProductsToFile } from '../utils/fileWriter';

test.beforeEach(async ({ page }) => {
  await page.goto('');
})

test('scrape products', async ({page}) => {
  const homePage = new HomePage(page);

  const page1Products = await homePage.getProducts();
  expect(await homePage.isNextButtonVisible()).toBeTruthy();
  await homePage.goToNextPage();
  const page2Products = await homePage.getProducts();

  const allProducts = [...page1Products, ...page2Products];
  writeProductsToFile(allProducts, 'data/products.txt');
})
