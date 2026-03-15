import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage/homePage';
import { ProductDetailPage } from '../pages/productDetailPage/productDetailPage';
import { CartPage } from '../pages/cartPage/cartPage';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test.describe('Cart additional tests', () => {

  test('product appears in cart after adding it', async ({ page }) => {
    const homePage = new HomePage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    let productName: string;

    await test.step('Select random product', async () => {
      productName = await homePage.openRandomProduct();
      await productDetailPage.waitForProduct();
    });

    await test.step('Add product to cart', async () => {
      await productDetailPage.addToCart();
    });

    await test.step('Open cart', async () => {
      await cartPage.openCart();
    });

    await test.step('Verify product appears in cart', async () => {
      await cartPage.expectProductInCart(productName);
    });
  });

  test('user can remove product from cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    await test.step('Add product to cart', async () => {
      await homePage.openRandomProduct();
      await productDetailPage.waitForProduct();
      await productDetailPage.addToCart();
    });

    await test.step('Open cart and verify product is present', async () => {
      await cartPage.openCart();
      await cartPage.waitForCartLoaded();
      await cartPage.expectProductsInCart(1);
    });

    await test.step('Remove product from cart', async () => {
      await cartPage.deleteFirstProduct();
    });

    await test.step('Verify cart is empty', async () => {
      await cartPage.expectCartEmpty();
    });
  });
});
