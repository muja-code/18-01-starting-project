import { useContext } from 'react';
import reactFoodLogo from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header({ onOpenCart }) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItem = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={reactFoodLogo} alt="react food logo image." />
        <h1>REACT FOOD</h1>
      </div>
      <nav>
        <Button type="button" onClick={handleShowCart} textOnly>
          Cart({totalCartItem})
        </Button>
      </nav>
    </header>
  );
}
