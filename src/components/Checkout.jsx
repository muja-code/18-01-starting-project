import { useContext, useState } from 'react';
import Modal from './Modal';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { currentFormatter } from '../util/formatting';
import Button from './UI/Button';
import Input from './UI/Input';
import useHttp from '../hooks/useHttp';

const httpConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const initialFormData = {
  name: '',
  email: '',
  street: '',
  'postal-code': '',
  city: '',
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [formData, setFormData] = useState(initialFormData);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', httpConfig);

  const totalCartItemPrice = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleInputChange(identifier, value) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [identifier]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const orderData = { items: cartCtx.items, customer: formData };
    await sendRequest(JSON.stringify({ order: orderData }));
  }

  function handleHideCheckout() {
    userProgressCtx.hideCheckout();
    setFormData(initialFormData);
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
    setFormData(initialFormData);
  }

  let actions = (
    <>
      <Button type="button" onClick={handleHideCheckout} textOnly>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={userProgressCtx.progress === 'checkout' ? handleFinish : null}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email with in the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={
        userProgressCtx.progress === 'checkout' ? handleHideCheckout : null
      }
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currentFormatter.format(totalCartItemPrice)}</p>
        <Input
          type="text"
          label="Full Name"
          id="name"
          onChange={(event) => handleInputChange('name', event.target.value)}
          value={formData.name}
        />
        <Input
          type="email"
          label="E-Mail Address"
          id="email"
          onChange={(event) => handleInputChange('email', event.target.value)}
          value={formData.email}
        />
        <Input
          type="text"
          label="Street"
          id="address"
          onChange={(event) => handleInputChange('street', event.target.value)}
          value={formData.street}
        />
        <div className="control-row">
          <Input
            type="text"
            label="Postal Code"
            id="code"
            onChange={(event) =>
              handleInputChange('postal-code', event.target.value)
            }
            value={formData['postal-code']}
          />

          <Input
            type="text"
            label="City"
            id="city"
            onChange={(event) => handleInputChange('city', event.target.value)}
            value={formData.city}
          />
        </div>
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
