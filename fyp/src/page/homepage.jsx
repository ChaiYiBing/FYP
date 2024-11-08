import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "./CartContext";
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

const products = [
    { id: 1, name: "Graphic Tee", type: "Shirt", price: "21.95 €", image: "https://via.placeholder.com/150", month: "January", rating: 4 },
    { id: 2, name: "Hoodie", type: "Shirt", price: "38.95 €", image: "https://via.placeholder.com/150", month: "February", rating: 5 },
    { id: 3, name: "Basic Tee", type: "Shirt", price: "19.95 €", image: "https://via.placeholder.com/150", month: "March", rating: 3 },
    { id: 4, name: "Long Sleeve Tee", type: "Shirt", price: "22.95 €", image: "https://via.placeholder.com/150", month: "April", rating: 4 },
    { id: 5, name: "V-Neck Tee", type: "Shirt", price: "24.95 €", image: "https://via.placeholder.com/150", month: "May", rating: 4 },
    { id: 6, name: "Jeans", type: "Pants", price: "29.95 €", image: "https://via.placeholder.com/150", month: "January", rating: 5 },
    { id: 7, name: "Chinos", type: "Pants", price: "27.95 €", image: "https://via.placeholder.com/150", month: "February", rating: 3 },
    { id: 8, name: "Sweatpants", type: "Pants", price: "25.95 €", image: "https://via.placeholder.com/150", month: "March", rating: 4 },
    { id: 9, name: "Shorts", type: "Pants", price: "19.95 €", image: "https://via.placeholder.com/150", month: "April", rating: 2 },
    { id: 10, name: "Joggers", type: "Pants", price: "23.95 €", image: "https://via.placeholder.com/150", month: "May", rating: 4 },
  ];

function HomePage() {
  const [favorites, setFavorites] = useState([]);
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterType, setFilterType] = useState("All"); // New filter for product type
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const handleMonthChange = (e) => setFilterMonth(e.target.value);
  const handleTypeChange = (e) => setFilterType(e.target.value); // Handler for type filter
  const toggleCartDropdown = () => setIsCartOpen((prev) => !prev);

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate("/payment");
  };

  // Filtering products by month and type
  const filteredProducts = products.filter((product) => 
    (filterMonth === "All" || product.month === filterMonth) &&
    (filterType === "All" || product.type === filterType)
  );

  return (
    <div className="container">
      <header className="d-flex justify-content-between align-items-center my-4">
        <h1 className="text-center">T-shirt and Pants</h1>
        <div className="d-flex align-items-center position-relative">
          <FaShoppingCart size={24} className="cart-icon" onClick={toggleCartDropdown} />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          {isCartOpen && (
            <div className="cart-dropdown bg-white p-3 position-absolute end-0 shadow" style={{ width: "300px", top: "30px", zIndex: 10 }}>
              <h5>Shopping Cart</h5>
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="list-group">
                  {cartItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6>{item.name}</h6>
                        <small>{item.price}</small>
                      </div>
                      <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Total:</strong>
                    <span>{cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2)} €</span>
                  </li>
                </ul>
              )}
              <button className="btn btn-primary w-100 mt-3" onClick={handlePayment}>
                Pay
              </button>
            </div>
          )}
          <button className={`btn ${cartItems.length === 0 ? 'btn-danger' : 'btn-success'} ms-3`} onClick={handlePayment}>
            Pay
          </button>
        </div>
      </header>

      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-3">
          <div className="bg-light p-3 rounded mb-4">
            <h5>Filter by Type</h5>
            <select className="form-select" value={filterType} onChange={handleTypeChange}>
              <option value="All">All Types</option>
              <option value="Shirt">Shirts</option>
              <option value="Pants">Pants</option>
            </select>
          </div>
          <button className="btn btn-info w-100 mt-4" onClick={() => navigate("/statistics")}>
            View Statistics
          </button>
        </aside>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="d-flex justify-content-center mb-4">
            <select className="form-select w-25" value={filterMonth} onChange={handleMonthChange}>
              <option value="All">All Months</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
            </select>
          </div>

          <div className="row">
            {filteredProducts.map((product) => (
              <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
                <div className="card product-card">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                  </Link>
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      <Link to={`/product/${product.id}`} className="text-dark text-decoration-none">
                        {product.name}
                      </Link>
                    </h5>
                    <p className="card-text">{product.price}</p>

                    {/* Product Rating */}
                    <div className="mb-2">
                      {[...Array(5)].map((_, index) => (
                        <FaStar key={index} color={index < product.rating ? "#ffc107" : "#e4e5e9"} />
                      ))}
                    </div>

                    <button className="btn btn-primary mt-2" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-link p-0 favorite-btn mt-2"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      {favorites.includes(product.id) ? (
                        <FaHeart color="red" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
