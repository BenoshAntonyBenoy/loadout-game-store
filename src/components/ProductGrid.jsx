import ProductCard from './ProductCard.jsx'

function ProductGrid({ products, onAdd }) {
  if (products.length === 0) {
    return <p className="grid-empty">No products match. Try another search or category.</p>
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  )
}

export default ProductGrid
