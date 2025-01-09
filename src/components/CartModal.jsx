export default function CartModal({
  onCloseCart,
  onCartCheckout,
  cart,
  onIncrement,
  onDecrement,
}) {
  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.count;
  }, 0);

  return (
    <>
      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <p>
                {item.name} - {item.count} x ${item.price}
              </p>
              <div className="cart-item-actions">
                <button type="button" onClick={() => onDecrement(item.id)}>
                  -
                </button>
                {item.count}
                <button type="button" onClick={() => onIncrement(item.id)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p className="cart-total">${totalPrice}</p>
      </div>
      <div className="modal-actions">
        <button type="button" className="text-button" onClick={onCloseCart}>
          Close
        </button>
        <button type="button" className="button" onClick={onCartCheckout}>
          Go to Checkout
        </button>
      </div>
    </>
  );
}
