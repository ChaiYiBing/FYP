import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function PaymentConfirmationPage() {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      alert(`Payment confirmed using ${paymentMethod}`);
      setIsProcessing(false);
    }, 2000);
  };

  const totalAmount = cartItems
    .reduce((total, item) => total + parseFloat(item.price), 0)
    .toFixed(2);

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <h2 className="text-center mb-4">Payment Confirmation</h2>
      
      <h5>Items in Your Cart:</h5>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group mb-4">
          {cartItems.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h6>{item.name}</h6>
                <small>{item.price}</small>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h4 className="text-end">Total: {totalAmount} €</h4>

      <h5 className="mt-4">Select Payment Method:</h5>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          id="tngEwallet"
          name="paymentMethod"
          value="TNG eWallet"
          onChange={() => handlePaymentMethodChange("TNG eWallet")}
          checked={paymentMethod === "TNG eWallet"}
        />
        <label className="form-check-label" htmlFor="tngEwallet">TNG eWallet</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          id="bankAccount"
          name="paymentMethod"
          value="Bank Account"
          onChange={() => handlePaymentMethodChange("Bank Account")}
          checked={paymentMethod === "Bank Account"}
        />
        <label className="form-check-label" htmlFor="bankAccount">Bank Account</label>
      </div>

      <button
        className="btn btn-success w-100 mt-4"
        onClick={handleConfirmPayment}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Confirm Payment"}
      </button>
    </div>
  );
}

export default PaymentConfirmationPage;
