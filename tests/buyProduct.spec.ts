import { test, expect } from '@playwright/test';
import demoblazeConfig from '../config/demoblaze.config.js';
import { HomePage } from '../pages/homePage/homePage';
import { ProductDetailPage } from '../pages/productDetailPage/productDetailPage';
import { CartPage } from '../pages/cartPage/cartPage';
import { cartSelectors} from '../pages/cartPage/cart.selectors';

test.beforeEach(async ({ page }) => {
  await page.goto(demoblazeConfig.baseUrl);
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

  const successMessage = page.locator(cartSelectors.purchaseMessage);
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText('Thank you for your purchase!');
});
