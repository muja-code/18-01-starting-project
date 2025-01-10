import { currentFormatter } from '../util/formatting';

export default function CartItem({
  name,
  quantity,
  price,
  onIncrement,
  onDecrement,
}) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currentFormatter.format(price)}
      </p>
      <div className="cart-item-actions">
        <button type="button" onClick={onDecrement}>
          -
        </button>
        <span>{quantity}</span>
        <button type="button" onClick={onIncrement}>
          +
        </button>
      </div>
    </li>
  );
}
