import test from 'node:test'
import assert from 'node:assert/strict'
import { products } from '../src/products.js'
import { findProducts, restoreCart } from '../src/storeData.js'

test('catalogue IDs are stable across module reloads', async () => {
  const reloaded = await import('../src/products.js?fresh-import')
  assert.deepEqual(products.map((item) => item.id), reloaded.products.map((item) => item.id))
  assert.equal(new Set(products.map((item) => item.id)).size, products.length)
})

test('old random-ID carts migrate by product name and duplicates combine', () => {
  const item = products[0]
  const cart = restoreCart([{ id: 'old-random-id', name: item.name, quantity: 2, price: 1 }, { id: item.id, quantity: 3 }], products)
  assert.deepEqual(cart, [{ id: item.id, name: item.name, price: item.price, quantity: 5 }])
})

test('unknown and damaged cart rows cannot break totals', () => {
  assert.deepEqual(restoreCart([null, {}, { id: products[0].id, quantity: -1 }, { id: 'missing', quantity: 2 }], products), [])
  assert.equal(restoreCart([{ id: products[0].id, quantity: 10000 }], products)[0].quantity, 99)
})

test('search and category combine and sorting never mutates the catalogue', () => {
  const original = products.map((item) => item.id)
  const found = findProducts(products, 'Consoles', 'PLAYSTATION', 'price-low')
  assert.equal(found.length, 1)
  const sorted = findProducts(products, 'All', '', 'price-low')
  assert.ok(sorted.every((item, index) => !index || item.price >= sorted[index - 1].price))
  assert.deepEqual(products.map((item) => item.id), original)
})
