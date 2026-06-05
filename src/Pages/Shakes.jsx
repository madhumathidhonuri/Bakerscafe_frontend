import React, { useState } from "react";
import axios from "axios";
// Assuming these assets exist in your project structure
import chocolateOreo from "../assets/chocolate-oreo.jpg";
import strawberryBerry from "../assets/strawberry-berry.jpg";
import mangoAlmond from "../assets/mango-almond.jpg";
import kitkatCrunch from "../assets/kitkat-crunch.jpg";
import coldCoffee from "../assets/cold-coffee.jpg";
import butterscotch from "../assets/butterscotch.jpg";

const shakeItems = [
  { id: 1, name: "Chocolate Oreo Shake", price: "₹149", image: chocolateOreo, type: "Premium", description: "Rich chocolate ice cream blended with crunchy Oreo cookies and fudge." },
  { id: 2, name: "Strawberry Berry Blast", price: "₹139", image: strawberryBerry, type: "Classic", description: "Creamy vanilla milk blended with real, sweet farm-fresh strawberries." },
  { id: 3, name: "Mango Almond Shake", price: "₹169", image: mangoAlmond, type: "Seasonal", description: "Alphanso mango pulp whipped with thick cream and roasted almond bits." },
  { id: 4, name: "KitKat Crunch Shake", price: "₹159", image: kitkatCrunch, type: "Premium", description: "Indulgent milk chocolate shake packed with crushed KitKat bars." },
  { id: 5, name: "Classic Cold Coffee", price: "₹119", image: coldCoffee, type: "Classic", description: "Perfectly brewed espresso shot blended with chilled milk and ice cream." },
  { id: 6, name: "Butterscotch Caramel", price: "₹139", image: butterscotch, type: "Classic", description: "Smooth butterscotch crunch ice cream topped with golden caramel drizzle." },
];

function Shakes() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = async (shake) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to order your pasta!");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/",
        { product_id: shake.id },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setCartCount((prev) => prev + 1);
      alert(`${shake.name} added to your cart!`);
    } catch (err) {
      console.error("Cart error:", err);
      alert("Error: Ensure shake ID " + shake.id + " is added to Django Admin first.");
    }
  };


  // Helper function to color code the shake badges dynamically
  const getBadgeColor = (type) => {
    switch(type) {
      case "Premium": return "bg-purple-100 text-purple-800";
      case "Seasonal": return "bg-amber-100 text-amber-800";
      default: return "bg-pink-100 text-pink-800";
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 px-6 py-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-16 border-b border-stone-200 pb-6">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-4xl font-extrabold text-stone-800 tracking-tight uppercase">
            Our <span className="text-amber-600">Shakes Menu</span>
          </h1>
          <p className="text-stone-500 mt-2 font-medium text-sm">Hand-tossed, fresh ingredients, baked to perfection.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
        {shakeItems.map((shake) => (
          <div
            key={shake.id}
            className="group flex flex-col items-center text-center max-w-xs transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Perfect Circle Image Box with matching borders */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-amber-600 group-hover:shadow-xl transition-all duration-300 bg-white">
              <img
                src={shake.image}
                alt={shake.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Product Details Section structured below the circle */}
            <div className="mt-6 flex flex-col items-center flex-grow">
              <h2 className="text-xl font-bold text-stone-800 mb-2 tracking-tight group-hover:text-amber-600 transition-colors">
                {shake.name}
              </h2>
              
              <p className="text-stone-500 text-sm mb-4 leading-relaxed line-clamp-2">
                {shake.description}
              </p>

              <div className="flex flex-col items-center gap-3 mt-auto w-full">
                {/* Price Display */}
                <span className="text-xl font-black text-stone-900">
                  {shake.price}
                </span>

                {/* Add To Cart Trigger */}
                <button 
                  onClick={() => handleAddToCart(shake)}
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

export default Shakes;