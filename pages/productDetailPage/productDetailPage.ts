import { Page } from '@playwright/test';
import { productDetailSelectors } from './productDetail.selectors';

export class ProductDetailPage {
  constructor(private page: Page) {}

  async addToCart() {
    await this.page.locator(productDetailSelectors.addToCartButton).click();
  }

  async waitForProduct() {
    await this.page.locator(productDetailSelectors.productName).waitFor();
  }
}