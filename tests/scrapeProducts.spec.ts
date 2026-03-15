import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage/homePage';
import { writeProductsToFile } from '../utils/fileWriter';
import { Product } from '../types/product';

test.beforeEach(async ({ page }) => {
  await page.goto('');
})

test('scrape products', async ({page}) => {
  const homePage = new HomePage(page);
  let page1Products: Product[];
  let page2Products: Product[];

  await test.step('Scrape first page products', async () => {
    page1Products = await homePage.getProducts();
  });

  await test.step('Navigate to second page', async () => {
    await homePage.expectNextButtonVisible();
    await homePage.goToNextPage();
  });

  await test.step('Scrape second page products', async () => {
    page2Products = await homePage.getProducts();
  });

  await test.step('Save results to file', async () => {
    const allProducts = [...page1Products, ...page2Products];
    writeProductsToFile(allProducts, 'data/products.txt');
  });
})
