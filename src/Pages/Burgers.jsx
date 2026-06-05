import React, { useState } from "react";
import axios from "axios"; // 1. Added axios import

// Assuming these assets exist in your project structure
import classicVeg from "../assets/classic-veg.jpg";
import cheeseLover from "../assets/cheese-lover.jpg";
import spicyPaneer from "../assets/spicy-paneer.jpg";
import chickenZinger from "../assets/chicken-zinger.jpg";
import doublePatty from "../assets/double-patty.jpg";
import mushroomSwiss from "../assets/mushroom-swiss.jpg";

const burgerItems = [
  // IDs changed to 7-12 to avoid clashing with Pizza IDs (1-6)
  { id: 7, name: "Classic Veg Burger", price: "₹129", image: classicVeg, isBestSeller: true, description: "Crispy veg patty with fresh lettuce and mayo." },
  { id: 8, name: "Cheese Lover Burger", price: "₹179", image: cheeseLover, isBestSeller: false, description: "Loaded with melted cheddar and a gooey cheese slice." },
  { id: 9, name: "Spicy Paneer Burger", price: "₹199", image: spicyPaneer, isBestSeller: true, description: "Peri-peri paneer patty with spicy harissa sauce." },
  { id: 10, name: "Chicken Zinger", price: "₹219", image: chickenZinger, isBestSeller: false, description: "Signature crispy chicken fillet with creamy dressing." },
  { id: 11, name: "The Double Patty", price: "₹289", image: doublePatty, isBestSeller: true, description: "Two flame-grilled patties for the ultimate hunger." },
  { id: 12, name: "Mushroom Swiss", price: "₹249", image: mushroomSwiss, isBestSeller: false, description: "Savory sautéed mushrooms and melted swiss cheese." },
];

function Burgers() {
  const [cartCount, setCartCount] = useState(0);

  // 2. Updated handleAddToCart to talk to Django
  const handleAddToCart = async (burger) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to add burgers to your cart!");
      return;
    }

    try {
      // ✅ Dynamically switches between Vercel configurations and your production endpoint
      const baseUrl = import.meta.env.VITE_API_URL || "https://madhumathidhonuri.pythonanywhere.com";

      await axios.post(
        `${baseUrl}/api/cart/`,
        { product_id: burger.id },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setCartCount((prev) => prev + 1);
      alert(`${burger.name} added to your cart!`);
    } catch (err) {
      console.error("Cart error:", err);
      alert("Error: Ensure burger ID " + burger.id + " is added to Django Admin first.");
    }
  };
  return (
    <div className="min-h-screen bg-stone-50 px-6 py-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-16 border-b border-stone-200 pb-6">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-4xl font-extrabold text-stone-800 tracking-tight uppercase">
            Our <span className="text-amber-600">Burger Menu</span>
          </h1>
          <p className="text-stone-500 mt-2 font-medium text-sm">Hand-tossed, fresh ingredients, baked to perfection.</p>
        </div>
      </div>

      {/* Pizza Menu Display Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
        {burgerItems.map((burger) => (
          <div
            key={burger.id}
            className="group flex flex-col items-center text-center max-w-xs transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Perfect Circle Image Box with matching borders */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-amber-600 group-hover:shadow-xl transition-all duration-300 bg-white">
              <img
                src={burger.image}
                alt={burger.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Product Details Section structured below the circle */}
            <div className="mt-6 flex flex-col items-center flex-grow">
              <h2 className="text-xl font-bold text-stone-800 mb-2 tracking-tight group-hover:text-amber-600 transition-colors">
                {burger.name}
              </h2>

              <p className="text-stone-500 text-sm mb-4 leading-relaxed line-clamp-2">
                {burger.description}
              </p>

              <div className="flex flex-col items-center gap-3 mt-auto w-full">
                {/* Price Display */}
                <span className="text-xl font-black text-stone-900">
                  {burger.price}
                </span>

                {/* Add To Cart Trigger */}
                <button
                  onClick={() => handleAddToCart(burger)}
                  className="bg-stone-900 hover:bg-amber-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-sm uppercase tracking-wider"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Burgers;