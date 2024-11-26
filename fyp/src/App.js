import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/homepage";
import LoginPage from "./page/login";
import CartPage from "./page/cart";
import PaymentConfirmationPage from "./page/paymentconfirmation";
import StatisticsPage from "./page/statistic";
import ProductDetailPage from "./page/productdetail"; // Import the ProductDetailPage component
import ProfilePage from "./page/profilepage"; // Import the ProfilePage component
import { CartProvider } from "./page/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentConfirmationPage />} />
          <Route path="/statistics" element={<StatisticsPage isAdmin={true} />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page route */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
