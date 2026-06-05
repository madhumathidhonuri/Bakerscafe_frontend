import React, { useState } from "react";
import axios from "axios";
// Assuming these assets exist in your project structure
import gulabJamun from "../assets/gulab-jamun.jpg";
import chocolateBrownie from "../assets/chocolate-brownie.jpg";
import rasMalai from "../assets/ras-malai.jpg";
import applePie from "../assets/apple-pie.jpg";
import chocoLava from "../assets/choco-lava.jpg";
import waffleSpecial from "../assets/waffle-special.jpg";

const dessertItems = [
  { id: 31, name: "Hot Gulab Jamun", price: "₹99", image: gulabJamun, type: "Traditional", description: "Soft, melt-in-the-mouth khoya balls soaked in saffron-infused sugar syrup." },
  { id: 32, name: "Sizzling Brownie", price: "₹189", image: chocolateBrownie, type: "Best Seller", description: "Warm walnut brownie served with a scoop of vanilla ice cream and hot fudge." },
  { id: 33, name: "Kesar Rasmalai", price: "₹129", image: rasMalai, type: "Traditional", description: "Flattened chhena balls soaked in thick, sweetened malai with pistachios." },
  { id: 34, name: "Deep Dish Apple Pie", price: "₹159", image: applePie, type: "Bakery", description: "Classic spiced apple filling with a buttery, flaky golden crust." },
  { id: 35, name: "Choco Lava Cake", price: "₹149", image: chocoLava, type: "Classic", description: "Warm chocolate cake with a gooey, molten chocolate center." },
  { id: 36, name: "Belgian Waffles", price: "₹199", image: waffleSpecial, type: "Modern", description: "Freshly baked waffles topped with maple syrup, whipped cream, and berries." },
];

function Desserts() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = async (item) => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("Please login first to order your pasta!");
        return;
      }
  
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/cart/",
          { product_id: item.id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
  
        setCartCount((prev) => prev + 1);
        alert(`${item.name} added to your cart!`);
      } catch (err) {
        console.error("Cart error:", err);
        alert("Error: Ensure dessert ID " + item.id + " is added to Django Admin first.");
      }
    };

  const getBadgeColor = (type) => {
    switch(type) {
      case "Best Seller": return "bg-purple-600 text-white";
      case "Traditional": return "bg-orange-100 text-orange-800";
      default: return "bg-violet-100 text-violet-800";
    }
  };

 return (
    <div className="min-h-screen bg-stone-50 px-6 py-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-16 border-b border-stone-200 pb-6">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-4xl font-extrabold text-stone-800 tracking-tight uppercase">
            Our <span className="text-amber-600">Dessert Menu</span>
          </h1>
          <p className="text-stone-500 mt-2 font-medium text-sm">Hand-tossed, fresh ingredients, baked to perfection.</p>
        </div>
      </div>

      {/* Pizza Menu Display Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
        {dessertItems.map((dessert) => (
          <div
            key={dessert.id}
            className="group flex flex-col items-center text-center max-w-xs transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Perfect Circle Image Box with matching borders */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-amber-600 group-hover:shadow-xl transition-all duration-300 bg-white">
              <img
                src={dessert.image}
                alt={dessert.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Product Details Section structured below the circle */}
            <div className="mt-6 flex flex-col items-center flex-grow">
              <h2 className="text-xl font-bold text-stone-800 mb-2 tracking-tight group-hover:text-amber-600 transition-colors">
                {dessert.name}
              </h2>
              
              <p className="text-stone-500 text-sm mb-4 leading-relaxed line-clamp-2">
                {dessert.description}
              </p>

              <div className="flex flex-col items-center gap-3 mt-auto w-full">
                {/* Price Display */}
                <span className="text-xl font-black text-stone-900">
                  {dessert.price}
                </span>

                {/* Add To Cart Trigger */}
                <button 
                  onClick={() => handleAddToCart(dessert)}
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

export default Desserts;