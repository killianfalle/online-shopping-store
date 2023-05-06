import { useContext } from 'react';
import { Context } from '../context/context';
import "../assets/cart.css"

const Cart = () => {
  const {
    cart,
    clearCart,
    checkout,
    onChangeQuantity,
    onRemoveItem
  } = useContext(Context)

  const getTotalItems = () => {
    return cart.reduce((acc, product) => acc + product.quantity, 0);
  }

  const getTotalAmount = () => {
    return cart.reduce((acc, product) => acc + (product.unitPrice * product.quantity), 0);
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <p className="title">My Cart</p>
        <button onClick={clearCart}>Clear</button>
      </div>

      <div className="cart-list-container">
        {cart.map((item, index) => (
          <div
            key={index}
            className="cart-item-container">
            <button className="remove-button" onClick={() => onRemoveItem(index)}>
              <p>x</p>
            </button>

            <div className="cart-product-image">
              <img src={item.imageUrl} alt={item.productName} />
            </div>

            <div className="cart-product-labels">
              <p className="cart-product-title">{item.productName}</p>
              <p className="cart-product-price">₱{(item.unitPrice * item.quantity).toLocaleString()}</p>
            </div>
            
            <div className="cart-product-price-container">
              <button disabled={item.quantity === 1} onClick={() => onChangeQuantity("decrement", item)}>-</button>
              <p>{item.quantity}</p>
              <button onClick={() => onChangeQuantity("increment", item)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-footer-row">
          <p className="total-items-label">Total Items: </p>
          <p className="total-value">{getTotalItems()}</p>
        </div>

        <div className="cart-footer-row">
          <p className="total-items-label">Total Amount: </p>
          <p className="total-value">₱{getTotalAmount().toLocaleString()}</p>
        </div>
        <button onClick={checkout}>Proceed To Checkout</button>
      </div>
    </div>
  );
};

export default Cart;