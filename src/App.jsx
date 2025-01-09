import { useRef, useState } from 'react';
import CartModal from './components/CartModal';
import Header from './components/Header';
import InputModal from './components/InputModal';
import Meals from './components/Meals';
import Modal from './components/Modal';

function App() {
  const [cart, setCart] = useState([]);
  const cartModal = useRef();
  const inputModal = useRef();

  const cartItemCount = cart.length;

  function handleAddCart(id, name, price) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem) {
        return prevCart.map((item) => {
          return item.id === id ? { ...item, count: item.count + 1 } : item;
        });
      } else {
        return [...prevCart, { id, name, price, count: 1 }];
      }
    });
  }

  function handleIncrementCartItem(id) {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        return item.id === id ? { ...item, count: item.count + 1 } : item;
      });
    });
  }

  function handleDecrementCartItem(id) {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        return item.id === id ? { ...item, count: item.count - 1 } : item;
      });
    });
  }

  function handleOpenModal() {
    cartModal.current.show();
  }

  function handleCloseModal(modal) {
    modal.current.close();
  }

  function handleCartCheckout() {
    cartModal.current.close();
    inputModal.current.show();
  }

  return (
    <>
      <Modal ref={cartModal}>
        <CartModal
          onCloseCart={() => handleCloseModal(cartModal)}
          onCartCheckout={handleCartCheckout}
          cart={cart}
          onIncrement={handleIncrementCartItem}
          onDecrement={handleDecrementCartItem}
        />
      </Modal>

      <Modal ref={inputModal}>
        <InputModal
          onCloseInput={() => handleCloseModal(inputModal)}
          cart={cart}
        />
      </Modal>

      <Header cartItemCount={cartItemCount} onOpenCart={handleOpenModal} />
      <main>
        <Meals onAddCart={handleAddCart} />
      </main>
    </>
  );
}

export default App;
