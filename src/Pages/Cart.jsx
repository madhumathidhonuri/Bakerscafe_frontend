import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Defining baseUrl to reuse dynamically across the component endpoints
  const baseUrl = import.meta.env.VITE_API_URL || "https://madhumathidhonuri.pythonanywhere.com";

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // ✅ Updated to point directly to your live production server URL
      const response = await axios.get(`${baseUrl}/api/cart/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setCartItems(response.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (itemId) => {
    const token = localStorage.getItem("token");
    try {
      // ✅ Updated to point directly to your live production server delete endpoint
      await axios.delete(`${baseUrl}/api/cart/${itemId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      // Remove from local state so it disappears instantly
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (err) {
      alert("Could not remove item.");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Extracts number from string like "₹199"
      const price = parseFloat(item.product.price.toString().replace(/[^0-9.]/g, ""));
      return total + (price * item.quantity);
    }, 0);
  };

  if (loading) return <div className="text-center py-20 text-amber-900 font-bold">Loading your cart...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Your <span className="text-amber-600">Cart</span></h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg mb-6">Your cart is empty. Time for some treats!</p>
            <button onClick={() => navigate("/menu")} className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold">Go to Menu</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List Section */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{item.product.name}</h3>
                    <p className="text-amber-600 font-bold">{item.product.price} x {item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors font-bold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 h-fit">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold">₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between mb-6 text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600 font-bold uppercase text-xs">Free</span>
              </div>
              <div className="border-t pt-6 flex justify-between items-center mb-8">
                <span>Total</span>
                <span className="text-3xl font-black text-amber-600">₹{calculateTotal()}</span>
              </div>
              <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-amber-600 transition-colors shadow-lg" onClick={() => navigate("/checkout")}>
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;