import { homePageSelectors } from './home.selectors';
import { expect, Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async getProducts() {
    await this.page.locator(homePageSelectors.productCards).first().waitFor();

    return this.page.locator(homePageSelectors.productCards).evaluateAll(
      (cards, selectors) =>
        cards.map((card) => ({
          name:
            card.querySelector(selectors.productName)?.textContent?.trim() ?? '',
          price:
            card.querySelector(selectors.productPrice)?.textContent?.trim() ?? '',
          link: card.querySelector(selectors.productName)?.getAttribute('href'),
        })),
      homePageSelectors,
    );
  }

  async expectNextButtonVisible() {
    await expect(this.page.locator(homePageSelectors.nextButton)).toBeVisible();
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

    const productName = await randomProduct
      .locator(homePageSelectors.productName)
      .innerText();
    await randomProduct.locator(homePageSelectors.productName).click();

    return productName;
  }
}