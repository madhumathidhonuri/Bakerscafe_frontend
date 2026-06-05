import React, { useState } from "react";
import axios from "axios"; // 1. Import axios

// Assuming these assets exist in your project structure
import arrabbiata from "../assets/arrabbiata.jpg";
import alfredo from "../assets/alfredo.jpg";
import pinkSauce from "../assets/pink-sauce.jpg";
import pesto from "../assets/pesto.jpg";
import carbonara from "../assets/carbonara.jpg";
import aglioOlio from "../assets/aglio-olio.jpg";

const pastaItems = [
  // Updated IDs to 13-18 to avoid clashing with other menu categories
  { id: 13, name: "Penne Arrabbiata", price: "₹229", image: arrabbiata, isChefSpecial: false, description: "Fiery red sauce made from plum tomatoes, garlic, and red chili flakes." },
  { id: 14, name: "Fettuccine Alfredo", price: "₹269", image: alfredo, isChefSpecial: true, description: "Rich, creamy parmesan white sauce tossed with butter and garlic." },
  { id: 15, name: "Mama's Pink Sauce", price: "₹289", image: pinkSauce, isChefSpecial: false, description: "The perfect blend of tangy tomato and indulgent cream sauce." },
  { id: 16, name: "Pesto Alla Genovese", price: "₹319", image: pesto, isChefSpecial: true, description: "Fresh basil, pine nuts, parmesan, and extra virgin olive oil." },
  { id: 17, name: "Classic Carbonara", price: "₹349", image: carbonara, isChefSpecial: false, description: "Traditional Roman style with egg yolk, pecorino cheese, and black pepper." },
  { id: 18, name: "Spaghetti Aglio e Olio", price: "₹249", image: aglioOlio, isChefSpecial: false, description: "Simple elegance: sautéed sliced garlic, olive oil, and chili flakes." },
];

function Pasta() {
  const [cartCount, setCartCount] = useState(0);

  // 2. Updated to send data to Django
  const handleAddToCart = async (pasta) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to order your pasta!");
      return;
    }

    try {
      // ✅ Dynamically switches between Vercel configurations and your production endpoint
      const baseUrl = import.meta.env.VITE_API_URL || "https://madhumathidhonuri.pythonanywhere.com";

      await axios.post(
        `${baseUrl}/api/cart/`,
        { product_id: pasta.id },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setCartCount((prev) => prev + 1);
      alert(`${pasta.name} added to your cart!`);
    } catch (err) {
      console.error("Cart error:", err);
      alert("Error: Ensure pasta ID " + pasta.id + " is added to Django Admin first.");
    }
  };
  return (
    <div className="min-h-screen bg-stone-50 px-6 py-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-16 border-b border-stone-200 pb-6">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-4xl font-extrabold text-stone-800 tracking-tight uppercase">
            Our <span className="text-amber-600">Pasta Menu</span>
          </h1>
          <p className="text-stone-500 mt-2 font-medium text-sm">Hand-tossed, fresh ingredients, baked to perfection.</p>
        </div>
      </div>

      {/* Pizza Menu Display Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
        {pastaItems.map((pasta) => (
          <div
            key={pasta.id}
            className="group flex flex-col items-center text-center max-w-xs transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Perfect Circle Image Box with matching borders */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-amber-600 group-hover:shadow-xl transition-all duration-300 bg-white">
              <img
                src={pasta.image}
                alt={pasta.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Product Details Section structured below the circle */}
            <div className="mt-6 flex flex-col items-center flex-grow">
              <h2 className="text-xl font-bold text-stone-800 mb-2 tracking-tight group-hover:text-amber-600 transition-colors">
                {pasta.name}
              </h2>

              <p className="text-stone-500 text-sm mb-4 leading-relaxed line-clamp-2">
                {pasta.description}
              </p>

              <div className="flex flex-col items-center gap-3 mt-auto w-full">
                {/* Price Display */}
                <span className="text-xl font-black text-stone-900">
                  {pasta.price}
                </span>

                {/* Add To Cart Trigger */}
                <button
                  onClick={() => handleAddToCart(pasta)}
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

export default Pasta;