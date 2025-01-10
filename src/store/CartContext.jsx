import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.item?.id,
  );
  const updatedItems = [...state.items];
  switch (action.type) {
    case 'ADD_ITEM':
      if (existingItemIndex > -1) {
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return { ...state, items: updatedItems };
    case 'REMOVE_ITEM':
      if (existingItemIndex > -1) {
        const existingItem = updatedItems[existingItemIndex];

        if (existingItem.quantity > 1) {
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          };
        } else {
          updatedItems.splice(existingItemIndex, 1);
        }
      }

      return { ...state, items: updatedItems };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(item) {
    dispatchCartAction({ type: 'REMOVE_ITEM', item });
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
