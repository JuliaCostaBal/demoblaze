import { expect, Page } from '@playwright/test';
import { cartSelectors } from './cart.selectors';

interface OrderData {
  name: string;
  country: string;
  city: string;
  card: string;
  month: string;
  year: string;
}

export class CartPage {
  constructor(private page: Page) {}

  async openCart() {
    await this.page.click(cartSelectors.cartLink);
  }

  async waitForCartLoaded() {
    await this.page.locator(cartSelectors.cartTable).waitFor();
  }

  async placeOrder() {
    await this.page.click(cartSelectors.placeOrderButton);
  }

  async fillOrderForm(orderData: OrderData) {
    await this.page.fill(cartSelectors.nameInput, orderData.name);
    await this.page.fill(cartSelectors.countryInput, orderData.country);
    await this.page.fill(cartSelectors.cityInput, orderData.city);
    await this.page.fill(cartSelectors.cardInput, orderData.card);
    await this.page.fill(cartSelectors.monthInput, orderData.month);
    await this.page.fill(cartSelectors.yearInput, orderData.year);
  }

  async confirmPurchase() {
    await this.page.click(cartSelectors.purchaseButton);
  }

  async expectPurchaseSuccess() {
    const successMessage = this.page.locator(cartSelectors.purchaseMessage);

    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('Thank you for your purchase!');
  }

  async expectProductsInCart(count: number) {
    await expect(this.page.locator(cartSelectors.productRows)).toHaveCount(
      count,
    );
  }

  async deleteFirstProduct() {
    const rows = this.page.locator(cartSelectors.productRows);
    const initialCount = await rows.count();

    await this.page.locator(cartSelectors.deleteButton).first().click();
    await expect(rows).toHaveCount(initialCount - 1);
  }

  async expectCartEmpty() {
    await expect(this.page.locator(cartSelectors.productRows)).toHaveCount(0);
  }

  async expectProductInCart(productName: string) {
    await expect(this.page.locator(cartSelectors.productRows)).toContainText(
      productName,
    );
  }
}
