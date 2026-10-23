import { useEffect, useMemo, useState } from 'react'
import { products, CATEGORIES } from './products.js'
import CategoryFilter from './components/CategoryFilter.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import Cart from './components/Cart.jsx'
import { findProducts, restoreCart } from './storeData.js'
import './App.css'

const CART_KEY = 'loadout:cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return restoreCart(parsed, products)
  } catch {
    return []
  }
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState(loadCart)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [storageError, setStorageError] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); setStorageError(false) }
    catch { setStorageError(true) }
  }, [cart])

  const visibleProducts = useMemo(() => {
    return findProducts(products, activeCategory, query, sort)
  }, [activeCategory, query, sort])

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  )

  const count = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(99, item.quantity + 1) }
            : item,
        )
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]
    })
  }

  function increase(id) {
    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item,
      ),
    )
  }

  function decrease(id) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function remove(id) {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">L</span>
          <div>
            <span className="brand-kicker">The gaming desk</span>
            <h1>Loadout</h1>
          </div>
        </div>
        <span className="cart-count">{count} in cart</span>
      </header>

      <p className="demo-note"><strong>Storefront demo.</strong> Products and prices are examples. No checkout or payment is available. Your cart stays in this browser, with up to 99 of each item.</p>
      {storageError && <p className="demo-note" role="alert">Your cart could not be saved. It will remain available only while this tab stays open.</p>}

      <main className="layout">
        <section className="store">
          <div className="store-tools">
            <label>Search products<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
            <label>Sort products<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Catalogue order</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name A–Z</option></select></label>
          </div>
          <p className="demo-note" role="status">{visibleProducts.length} of {products.length} products</p>
          <CategoryFilter
            categories={CATEGORIES}
            active={activeCategory}
            onChange={setActiveCategory}
          />
          <ProductGrid products={visibleProducts} onAdd={addToCart} />
        </section>

        <Cart
          items={cart}
          total={total}
          count={count}
          onIncrease={increase}
          onDecrease={decrease}
          onRemove={remove}
        />
      </main>
    </div>
  )
}

export default App
