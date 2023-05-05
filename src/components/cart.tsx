import React, { useContext } from 'react';
import { Context } from '../context/context';
import "../assets/cart.css"

const Cart: React.FC<CartProps> = () => {
  const {cart} = useContext(Context)

  console.log("CART => ", cart)
  return (
    <div className="cart-container">
      <p className="title">Cart here</p>

      {cart.map((item, index) => (
        <div
          key={index}
          className="cart-item-container">
          <p>{item.productName}</p>
          <p>{item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

interface CartProps {}

export default Cart;