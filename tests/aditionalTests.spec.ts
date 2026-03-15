import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage/homePage';
import { ProductDetailPage } from '../pages/productDetailPage/productDetailPage';
import { CartPage } from '../pages/cartPage/cartPage';
import { cartSelectors } from '../pages/cartPage/cart.selectors';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test.describe('Cart additional tests', () => {
  test('added product appears in cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productName = await homePage.openRandomProduct();

    const productDetailPage = new ProductDetailPage(page);
    await productDetailPage.waitForProduct();
    await productDetailPage.addToCart();

    const cartPage = new CartPage(page);
    await cartPage.openCart();

    await expect(page.locator(cartSelectors.productRows)).toContainText(
      productName,
    );
  });

  test('user can remove product from cart', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openRandomProduct();

    const productDetailPage = new ProductDetailPage(page);
    await productDetailPage.addToCart();

    const cartPage = new CartPage(page);
    await cartPage.openCart();
    await cartPage.expectProductsInCart(1);

    await cartPage.deleteFirstProduct();
    await expect(page.locator(cartSelectors.productRows)).toHaveCount(0);
  });
});
