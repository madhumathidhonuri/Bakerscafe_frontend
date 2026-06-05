import React, { useState } from "react";
import axios from "axios"; 
import margherita from "../assets/margherita.jpg";
import veggieDelight from "../assets/veggie-delight.jpg";
import farmhouse from "../assets/farmhouse.jpg";
import paneerTikka from "../assets/paneer-tikka.jpg";
import pepperoni from "../assets/pepperoni.jpg";
import cheeseBurst from "../assets/cheese-burst.jpg";

const pizzaItems = [
  { id: 1, name: "Margherita Pizza", price: "₹199", image: margherita, description: "Classic delight with 100% real mozzarella cheese." },
  { id: 2, name: "Veggie Delight", price: "₹249", image: veggieDelight, description: "Golden corn, black olives, crunchy capsicum and onion." },
  { id: 3, name: "Farmhouse Pizza", price: "₹299", image: farmhouse, description: "Delightful combination of onion, capsicum, tomato & mushroom." },
  { id: 4, name: "Paneer Tikka Pizza", price: "₹349", image: paneerTikka, description: "Paneer tikka, onion, and capsicum with tandoori sauce." },
  { id: 5, name: "Pepperoni Pizza", price: "₹399", image: pepperoni, description: "American classic with spicy pepperoni and extra cheese." },
  { id: 6, name: "Cheese Burst Pizza", price: "₹449", image: cheeseBurst, description: "Loaded with gooey liquid cheese inside the crust." },
];

function Pizzas() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = async (pizza) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add items to your cart!");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/",
        { product_id: pizza.id },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setCartCount((prev) => prev + 1);
      alert(`${pizza.name} added to your account cart!`);
    } catch (err) {
      console.error("Cart Error:", err);
      alert("Failed to add to cart. Ensure this product exists in your Django database.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 px-6 py-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-16 border-b border-stone-200 pb-6">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-4xl font-extrabold text-stone-800 tracking-tight uppercase">
            Our <span className="text-amber-600">Pizza Menu</span>
          </h1>
          <p className="text-stone-500 mt-2 font-medium text-sm">Hand-tossed, fresh ingredients, baked to perfection.</p>
        </div>
      </div>

      {/* Pizza Menu Display Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
        {pizzaItems.map((pizza) => (
          <div
            key={pizza.id}
            className="group flex flex-col items-center text-center max-w-xs transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Perfect Circle Image Box with matching borders */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-amber-600 group-hover:shadow-xl transition-all duration-300 bg-white">
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Product Details Section structured below the circle */}
            <div className="mt-6 flex flex-col items-center flex-grow">
              <h2 className="text-xl font-bold text-stone-800 mb-2 tracking-tight group-hover:text-amber-600 transition-colors">
                {pizza.name}
              </h2>
              
              <p className="text-stone-500 text-sm mb-4 leading-relaxed line-clamp-2">
                {pizza.description}
              </p>

              <div className="flex flex-col items-center gap-3 mt-auto w-full">
                {/* Price Display */}
                <span className="text-xl font-black text-stone-900">
                  {pizza.price}
                </span>

                {/* Add To Cart Trigger */}
                <button 
                  onClick={() => handleAddToCart(pizza)}
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

export default Pizzas;