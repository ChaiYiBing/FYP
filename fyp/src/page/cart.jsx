import React from "react";
import { useCart } from "./CartContext";
import { FaTrash } from "react-icons/fa";

function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>{item.price}</p>
                </div>
                <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>
                  <FaTrash /> Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: {totalPrice} €</h4>
            <button className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
