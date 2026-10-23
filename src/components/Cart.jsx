import { formatRupees } from '../currency.js'
import CartSummary from './CartSummary.jsx'

function Cart({ items, total, count, onIncrease, onDecrease, onRemove }) {
  return (
    <aside className="cart">
      <h2 className="cart-title">Your cart</h2>

      {items.length === 0 ? (
        <p className="cart-empty">
          Your cart is empty. Add something to get started.
        </p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-top">
                  <span className="cart-item-name">{item.name}</span>
                  <button
                    type="button"
                    className="cart-remove"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </div>

                <div className="cart-item-bottom">
                  <div className="qty">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onDecrease(item.id)}
                      aria-label={`Reduce ${item.name} quantity`}
                    >
                      &minus;
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onIncrease(item.id)}
                      disabled={item.quantity >= 99}
                      aria-label={`Add another ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <span className="cart-item-price">
                    {formatRupees(item.price * item.quantity)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <CartSummary total={total} count={count} />
        </>
      )}
    </aside>
  )
}

export default Cart
