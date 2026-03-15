import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage/homePage';
import { ProductDetailPage } from '../pages/productDetailPage/productDetailPage';
import { CartPage } from '../pages/cartPage/cartPage';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('buy one product', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);

  await test.step('Open random product', async () => {
    await homePage.openRandomProduct();
    await productDetailPage.waitForProduct();
  });

  await test.step('Add product to cart', async () => {
    await productDetailPage.addToCart();
  });

  await test.step('Open cart', async () => {
    await cartPage.openCart();
    await cartPage.waitForCartLoaded();
  });

  await test.step('Complete purchase', async () => {
    await cartPage.placeOrder();

    await cartPage.fillOrderForm({
      name: 'Test User',
      country: 'Uruguay',
      city: 'Montevideo',
      card: '123456',
      month: '03',
      year: '2026',
    });

    await cartPage.confirmPurchase();
  });

  await test.step('Validate purchase success', async () => {
    await cartPage.expectPurchaseSuccess();
  });
});
