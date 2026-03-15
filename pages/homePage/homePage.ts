import { homePageSelectors } from './home.selectors';
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

      const name = await product
        .locator(homePageSelectors.productName)
        .innerText();
      const price = await product
        .locator(homePageSelectors.productPrice)
        .innerText();
      const link = await product
        .locator(homePageSelectors.productName)
        .getAttribute('href');

      result.push({ name, price, link });
    }

    return result;
  }

  async isNextButtonVisible() {
    return this.page.locator(homePageSelectors.nextButton).isVisible();
  }

  async goToNextPage() {
    const firstProductBefore = await this.page
      .locator(homePageSelectors.productName)
      .first()
      .innerText();

    await this.page.click(homePageSelectors.nextButton);

    await this.page.waitForFunction(
      ({ selector, previousName }) => {
        const el = document.querySelector(selector);
        return el && el.textContent !== previousName;
      },
      {
        selector: homePageSelectors.productName,
        previousName: firstProductBefore,
      },
    );
  }

  async openRandomProduct() {
    await this.page.locator(homePageSelectors.productCards).first().waitFor();
    const products = this.page.locator(homePageSelectors.productCards);

    const count = await products.count();
    const randomIndex = Math.floor(Math.random() * count);
    const randomProduct = products.nth(randomIndex);

    await randomProduct.locator(homePageSelectors.productName).click();
  }
}