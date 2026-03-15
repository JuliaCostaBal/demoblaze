import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage/homePage';
import { ProductDetailPage } from '../pages/productDetailPage/productDetailPage';
import { CartPage } from '../pages/cartPage/cartPage';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('buy one product', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.openRandomProduct();

  const productDetailPage = new ProductDetailPage(page);
  await productDetailPage.waitForProduct();
  await productDetailPage.addToCart();

  const cartPage = new CartPage(page);
  await cartPage.openCart();
  await cartPage.waitForCartLoaded();
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
  await cartPage.expectPurchaseSuccess();
});
