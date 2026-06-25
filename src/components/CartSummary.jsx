import { formatRupees } from '../currency.js'

function CartSummary({ total, count }) {
  return (
    <div className="cart-summary">
      <div className="summary-line">
        <span>Items</span>
        <span>{count}</span>
      </div>
      <div className="summary-line summary-total">
        <span>Total</span>
        <span>{formatRupees(total)}</span>
      </div>
      <button type="button" className="btn btn-checkout" disabled={count === 0}>
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
