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

### 1. Scrape Products From First Two Pages

Extracts product information from the first two pages of the catalog:

* Product name
* Product price
* Product link

The results are saved in:

```
data/products.txt
```

---

### 2. User Can Complete Purchase Successfully

Validates the full purchase flow:

1. Select a random product
2. Add the product to the cart
3. Navigate to the cart
4. Fill the order form
5. Confirm purchase
6. Validate success message

---

### 3. Product Added to Cart Appears in Cart

Validates that a product added from the catalog is correctly displayed in the cart.

---

### 4. User Can Remove Product From Cart

Validates that a product can be removed from the cart and that the cart updates accordingly.

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

Julia Costa
QA Automation Engineer
