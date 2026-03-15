# Demoblaze UI Automation – Playwright

## Overview

This project contains a UI automation framework built with **Playwright and TypeScript** to validate key functionalities of the Demoblaze demo e-commerce application.

The framework follows the **Page Object Model (POM)** design pattern and separates responsibilities between selectors, page logic, and tests to improve maintainability and scalability.

The automated scenarios include:

* Product catalog scraping
* End-to-end purchase flow
* Cart validation scenarios

---

## Tech Stack

* **Playwright**
* **TypeScript**
* **Node.js**
* **Page Object Model (POM)**

---

## Project Structure

```
tests
 ├── scrapeProducts.spec.ts
 ├── buyProduct.spec.ts
 └── additionalTests.spec.ts

pages
 ├── homePage
 ├── productDetailPage
 └── cartPage

selectors
 ├── home.selectors.ts
 ├── productDetail.selectors.ts
 └── cart.selectors.ts

types
 ├── product.ts
 └── order.ts

utils
 └── fileWriter.ts

data
 └── products.txt
```

---

## Test Scenarios

The automation suite is organized into three main test files, each covering a specific area of the application.

### 1. Product Scraping (`scrapeProducts.spec.ts`)

Extracts product information from the first two pages of the catalog.

The following data is collected for each product:

- Product name
- Product price
- Product link

The collected data is saved to:

data/products.txt

---

### 2. Purchase Flow (`buyProduct.spec.ts`)

Validates the end-to-end purchase process.

Flow covered:

1. Open a random product from the catalog
2. Add the product to the cart
3. Navigate to the cart
4. Fill the order form
5. Confirm the purchase
6. Validate the success message

---

### 3. Cart Scenarios (`additionalTests.spec.ts`)

This test file contains additional cart validation scenarios:

**Product added to cart appears in cart**

- Select a random product
- Add the product to the cart
- Open the cart
- Verify the product appears in the cart

**User can remove product from cart**

- Add a product to the cart
- Open the cart
- Remove the product
- Verify the cart is empty
---

## Setup

Install dependencies:

```
npm install
```

Install Playwright browsers:

```
npx playwright install
```

---

## Running the Tests

Run all tests:

```
npx playwright test
```

Run tests with UI:

```
npx playwright test --ui
```

Run a specific test file:

```
npx playwright test tests/buyProduct.spec.ts
```

---

## Design Decisions

* **Page Object Model** used to encapsulate UI interactions.
* **Selectors separated from page logic** to improve maintainability.
* **TypeScript types** used to structure data objects such as `Product` and `Order`.
* **Playwright test steps** used to improve test reporting and debugging.

---

## Author

Julia Costa,
QA Automation Engineer
