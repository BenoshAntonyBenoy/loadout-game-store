# Loadout

A small gaming store built with React and Vite. Browse consoles, controllers,
games, laptops, and headsets, filter by category, and build up a cart. The cart
is saved in your browser's localStorage, so it survives a refresh.

## What it does

- Product grid with 12 gaming products across five categories
- Filter the grid by category
- Search product names, categories and descriptions; sort by name or price
- Add products to the cart, with quantity controls and a remove button
- Live cart total that updates as you change quantities
- A friendly message when the cart is empty
- The cart is saved automatically and reloaded on your next visit
- Prices are shown with the ₹ symbol and Indian digit grouping

This is a storefront demo: prices are examples and no payment is available.
Stable product identifiers keep saved carts connected after reloads. Existing
random-ID entries migrate by their known product name; duplicate rows combine.
Quantities are capped at 99 and saved prices come from the sample catalogue.
Storage failures produce a visible warning. Run `npm test`, `npm run lint` and
`npm run build` before releasing.

## Running it locally

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Vite prints a local URL (usually http://localhost:5173). Open it in your
browser.

To make a production build:

```bash
npm run build
npm run preview
```

## Deploying to GitHub Pages

The repo includes a GitHub Actions workflow at
`.github/workflows/deploy.yml`. Once the repo is on GitHub, open
**Settings → Pages**, set the source to **GitHub Actions**, and every push to
`main` will build and publish the site.

## Project layout

```
src/
  components/
    ProductCard.jsx     one product, with an add-to-cart button
    ProductGrid.jsx     grid of product cards
    CategoryFilter.jsx  category chips
    Cart.jsx            cart items with quantity and remove controls
    CartSummary.jsx     item count, total, and checkout button
  products.js           the product data and category list
  currency.js           ₹ formatting helper
  App.jsx               cart state, localStorage, and layout
  App.css               component styles
  index.css             base styles and the dark theme
  main.jsx              app entry point
```
