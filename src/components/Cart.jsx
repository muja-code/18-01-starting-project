import { useContext } from 'react';
import Modal from './Modal';
import CartContext from '../store/CartContext';
import { currentFormatter } from '../util/formatting';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItemPrice = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleShowCheckout() {
    userProgressCtx.showCheckout();
  }

  function handleHideCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === 'cart'}
      onClose={userProgressCtx.progress === 'cart' ? handleHideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            onIncrement={() => cartCtx.addItem(item)}
            onDecrement={() => cartCtx.removeItem(item)}
            {...item}
          ></CartItem>
        ))}
      </ul>
      <p className="cart-total">
        {currentFormatter.format(totalCartItemPrice)}
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleHideCart}>
          Close
        </Button>
        <Button
          onClick={handleShowCheckout}
          disabled={cartCtx.items.length < 1}
        >
          Go to Checkout
        </Button>
      </p>
    </Modal>
  );
}
