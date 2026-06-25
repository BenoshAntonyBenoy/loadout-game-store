import { formatRupees } from '../currency.js'

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <span className="product-tag">{product.category}</span>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-desc">{product.description}</p>

      <div className="product-foot">
        <span className="product-price">{formatRupees(product.price)}</span>
        <button
          type="button"
          className="btn btn-add"
          onClick={() => onAdd(product)}
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard
