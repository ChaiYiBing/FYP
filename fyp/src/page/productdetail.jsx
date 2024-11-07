import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

function ProductDetailPage() {
  const { productId } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Example product data (replace with real data or API call)
  const products = [
    { id: "1", name: "Graphic Tee", price: "21.95 €", image: "https://via.placeholder.com/150", description: "A comfortable graphic tee made from soft cotton." },
    { id: "2", name: "Hoodie", price: "38.95 €", image: "https://via.placeholder.com/150", description: "A warm and cozy hoodie for cold days." },
    // Add more products as needed
  ];

  // Find the product based on the productId
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} has been added to your cart.`);
  };

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <h4 className="text-muted">{product.price}</h4>
          <p>{product.description}</p>

          <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
