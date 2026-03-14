import { homePageSelectors } from './demoblazeHome.selectors';
import { Page } from '@playwright/test';

export class HomePage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getProducts() {

    await this.page.locator(homePageSelectors.productCards).first().waitFor();
    const products = this.page.locator(homePageSelectors.productCards);

    const count = await products.count();

    const result: { name: string; price: string; link: string | null }[] = [];

    for (let i = 0; i < count; i++) {

      const product = products.nth(i);

      const name = await product.locator(homePageSelectors.productName).innerText();
      const price = await product.locator(homePageSelectors.productPrice).innerText();
      const link = await product.locator(homePageSelectors.productName).getAttribute('href');

      result.push({ name, price, link });
    }

    return result;
  }
}