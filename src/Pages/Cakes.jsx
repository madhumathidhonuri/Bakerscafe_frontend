import React, { useState } from "react";
import axios from "axios";
import chocFudge from "../assets/chocolate-fudge.jpg";
import redVelvet from "../assets/red-velvet.jpg";
import blueberryCheese from "../assets/blueberry-cheesecake.jpg";
import blackForest from "../assets/black-forest.jpg";
import pineappleDelight from "../assets/pineapple-delight.jpg";
import tiramisuCake from "../assets/tiramisu-cake.jpg";

const cakeItems = [
  { id: 25, name: "Death by Chocolate", price: "₹599", image: chocFudge, type: "Best Seller", description: "Layers of rich chocolate sponge cake smothered in dark chocolate ganache." },
  { id: 26, name: "Classic Red Velvet", price: "₹649", image: redVelvet, type: "Premium", description: "Crimson-colored cocoa cake layered with smooth vanilla cream cheese frosting." },
  { id: 27, name: "Blueberry Cheesecake", price: "₹749", image: blueberryCheese, type: "Eggless available", description: "Creamy baked New York style cheesecake topped with sweet blueberry compote." },
  { id: 28, name: "Authentic Black Forest", price: "₹549", image: blackForest, type: "Classic", description: "Traditional sponge layers infused with cherry syrup, fresh cream, and chocolate flakes." },
  { id: 29, name: "Pineapple Paradise", price: "₹499", image: pineappleDelight, type: "Classic", description: "Light, airy sponge cake soaked in sweet pineapple juice and juicy chunks." },
  { id: 30, name: "Espresso Tiramisu Cake", price: "₹699", image: tiramisuCake, type: "Premium", description: "Coffee-soaked layers dusted with rich cocoa powder and whipped mascarpone cream." },
];

function Cakes() {
  const [cartCount, setCartCount] = useState(0);
  const handleAddToCart = async (cake) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to order your pasta!");
      return;
    }
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/",
        { product_id: cake.id },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setCartCount((prev) => prev + 1);
      alert(`${cake.name} added to your cart!`);
    } catch (err) {
      console.error("Cart error:", err);
      alert("Error: Ensure cake ID " + cake.id + " is added to Django Admin first.");
    }
  };

  // Unique custom palette for a bakery
  const getBadgeColor = (type) => {
    switch (type) {
      case "Best Seller": return "bg-amber-100 text-amber-900 border border-amber-200";
      case "Premium": return "bg-rose-100 text-rose-950 border border-rose-200";
      default: return "bg-stone-100 text-stone-800 border border-stone-200";
    }
  };
  return (
    <div className="min-h-screen bg-stone-50 px-6 py-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-16 border-b border-stone-200 pb-6">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-4xl font-extrabold text-stone-800 tracking-tight uppercase">
            Our <span className="text-amber-600">Cakes Menu</span>
          </h1>
          <p className="text-stone-500 mt-2 font-medium text-sm">Hand-tossed, fresh ingredients, baked to perfection.</p>
        </div>
      </div>

      {/* Pizza Menu Display Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
        {cakeItems.map((cake) => (
          <div
            key={cake.id}
            className="group flex flex-col items-center text-center max-w-xs transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Perfect Circle Image Box with matching borders */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-amber-600 group-hover:shadow-xl transition-all duration-300 bg-white">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Product Details Section structured below the circle */}
            <div className="mt-6 flex flex-col items-center flex-grow">
              <h2 className="text-xl font-bold text-stone-800 mb-2 tracking-tight group-hover:text-amber-600 transition-colors">
                {cake.name}
              </h2>
              
              <p className="text-stone-500 text-sm mb-4 leading-relaxed line-clamp-2">
                {cake.description}
              </p>

              <div className="flex flex-col items-center gap-3 mt-auto w-full">
                {/* Price Display */}
                <span className="text-xl font-black text-stone-900">
                  {cake.price}
                </span>

                {/* Add To Cart Trigger */}
                <button 
                  onClick={() => handleAddToCart(cake)}
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

export default Cakes;