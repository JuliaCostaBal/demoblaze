import { Page } from '@playwright/test';
import { cartSelectors } from './cart.selectors';

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

  async fillOrderForm(orderData: any) {
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
}
