import React from "react";
import { Link } from "react-router-dom";

// 1. IMPORT YOUR BACKGROUND IMAGE HERE
import backgroundImage from "../assets/Background_image.jpg";

const categories = [
  { name: "Pizzas", icon: "🍕", path: "/menu/pizzas", color: "bg-orange-500" },
  { name: "Burgers", icon: "🍔", path: "/menu/burgers", color: "bg-amber-500" },
  { name: "Pasta", icon: "🍝", path: "/menu/pasta", color: "bg-emerald-600" },
  { name: "Shakes", icon: "🥤", path: "/menu/shakes", color: "bg-pink-500" },
  { name: "Cakes", icon: "🎂", path: "/menu/cakes", color: "bg-rose-500" },
  { name: "Desserts", icon: "🍨", path: "/menu/desserts", color: "bg-purple-500" },
];

function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-800">
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 h-[450px] flex items-center justify-center overflow-hidden">
        
        {/* 2. FIXED BACKGROUND IMAGE CONTAINER */}
        <div 
          className="absolute inset-0 opacity-50 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80"></div>

        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">
            Baker's Cafe
          </h1>
          <p className="text-gray-300 text-base md:text-lg font-normal leading-relaxed mb-8">
            Freshly prepared culinary essentials. Hand-tossed, freshly baked, 
            and prepared daily with premium ingredients.
          </p>
          <Link 
            to="/menu" 
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-full transition-all transform hover:scale-105 shadow-md"
          >
            Explore Menu
          </Link>
        </div>
      </section>

      {/* Categories Section with Updated Background color to match the Navbar theme */}
      <section className="w-full bg-amber-100/100 py-16 px-6 border-y border-amber-100/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xl font-bold tracking-widest text-amber-800/50 uppercase">
              Categories
            </h2>
            {/* Soft border divider that blends into the warm theme */}
            <div className="h-[1px] bg-amber-200/50 flex-grow ml-6"></div>
          </div>

          {/* Clean Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className="group flex flex-col items-center p-6 bg-white rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-amber-100/20"
              >
                <div className={`${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-base font-bold text-stone-700 group-hover:text-amber-600 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
          
        </div>
      </section>

    </div>
  );
}

export default Home;