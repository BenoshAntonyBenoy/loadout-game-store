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
      <p className="demo-note">Demo total only. No payment is taken.</p>
    </div>
  )
}

export default CartSummary
