import { useState } from 'react';

export default function InputModal({ onCloseInput, cart }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    'postal-code': '',
    city: '',
  });

  function handleInputChange(identifier, value) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [identifier]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const orderData = { items: cart, customer: formData };
    await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: orderData }),
    });
  }

  return (
    <>
      <h2>Checkout</h2>
      <p>$99.99</p>
      <form className="control" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(event) => handleInputChange('name', event.target.value)}
          value={formData.name}
        />
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(event) => handleInputChange('email', event.target.value)}
          value={formData.email}
        />
        <label htmlFor="address">Street</label>
        <input
          type="text"
          name="address"
          id="address"
          onChange={(event) => handleInputChange('street', event.target.value)}
          value={formData.street}
        />
        <div className="control-row">
          <div>
            <label htmlFor="code">Postal Code</label>
            <input
              type="text"
              name="code"
              id="code"
              onChange={(event) =>
                handleInputChange('postal-code', event.target.value)
              }
              value={formData['postal-code']}
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={(event) =>
                handleInputChange('city', event.target.value)
              }
              value={formData.city}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" className="text-button" onClick={onCloseInput}>
            Close
          </button>
          <button type="submit" className="button">
            Submit Order
          </button>
        </div>
      </form>
    </>
  );
}
