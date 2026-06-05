import React from "react";
import pizzas from "../assets/pizza.jpg";
import burgers from "../assets/Burger.jpg";
import pasta from "../assets/Penne-arrabbiata-72de043.jpg";
import shakes from "../assets/Shakes.jpg";
import cakes from "../assets/cake.jpg";
import desserts from "../assets/dessert.jpg";
import { Link } from "react-router-dom";

function Menu() {
  const menuItems = [
    { name: "Pizzas", image: pizzas, path: "/menu/pizzas" },
    { name: "Burgers", image: burgers, path: "/menu/burgers" },
    { name: "Pasta", image: pasta, path: "/menu/pasta" },
    { name: "Shakes", image: shakes, path: "/menu/shakes" },
    { name: "Cakes", image: cakes, path: "/menu/cakes" },
    { name: "Desserts", image: desserts, path: "/menu/desserts" },
  ];

  return (
    <div className="min-h-screen bg-stone-50/50 px-6 py-12">
      {/* Page Title Header */}
      <h1 className="text-4xl font-black text-center mb-16 tracking-tighter uppercase text-stone-800">
        Our <span className="text-amber-600">Menu</span>
      </h1>

      {/* Grid Layout Configuration:
        - grid-cols-2: Shows 2 items per row on mobile screens.
        - sm/md/lg:grid-cols-3: Locks the layout to exactly 3 items per row on tablets and desktops.
        - gap-y-14: Creates comfortable vertical breathing room between the two rows.
        - max-w-4xl: Restricts overall grid expansion to keep columns tightly centered.
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-y-20 gap-x-7 max-w-7xl mx-auto justify-items-center">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Circular Image Container:
              - w-36 h-36 to w-44 h-44: Upscaled diameters for better presentation space.
              - rounded-full & overflow-hidden: Works together to enforce the clean circle crop.
              - border-4 border-white: Generates that premium white rim accent ring.
            */}
            <div className="w-44 h-44 sm:w-54 sm:h-54 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-amber-600 group-hover:shadow-xl transition-all duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Category Text Label */}
            <h2 className="mt-4 text-base font-bold text-stone-700 group-hover:text-amber-600 transition-colors tracking-tight uppercase">
              {item.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Menu;