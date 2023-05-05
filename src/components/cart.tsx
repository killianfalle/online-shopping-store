import React from 'react';
import "../assets/cart.css"

const Cart: React.FC<CartProps> = () => {
  return (
    <div className="cart-container">
      <p>Cart here</p>
    </div>
  );
};

interface CartProps {}

export default Cart;