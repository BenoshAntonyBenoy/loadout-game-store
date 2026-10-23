export function restoreCart(value, products) {
  if (!Array.isArray(value)) return []
  const rows = new Map()
  for (const item of value) {
    if (!item || !Number.isInteger(item.quantity) || item.quantity <= 0) continue
    // Old versions generated new IDs on every load. Recognize their saved names.
    const product = products.find((entry) => entry.id === item.id)
      ?? products.find((entry) => entry.name === item.name)
    if (!product) continue
    const quantity = Math.min(99, (rows.get(product.id)?.quantity ?? 0) + item.quantity)
    rows.set(product.id, { id: product.id, name: product.name, price: product.price, quantity })
  }
  return [...rows.values()]
}

export function findProducts(products, category, query, sort) {
  const needle = query.trim().toLowerCase()
  return products.filter((product) => (category === 'All' || product.category === category)
    && [product.name, product.category, product.description].some((text) => text.toLowerCase().includes(needle)))
    .sort((a, b) => sort === 'price-low' ? a.price - b.price
      : sort === 'price-high' ? b.price - a.price
        : sort === 'name' ? a.name.localeCompare(b.name) : 0)
}
