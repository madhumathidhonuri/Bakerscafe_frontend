import React from "react";

// Import a local image from your assets folder
import aboutHeroImage from "../assets/Background_image.jpg"; 

function AboutUs() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 font-sans antialiased flex flex-col lg:flex-row">
      
      {/* LEFT SIDE: Sticky Visual Panel */}
      <div className="lg:w-1/2 h-[45vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden relative">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url(${aboutHeroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-8 left-8 right-8 text-white z-10">
          <p className="text-xs uppercase tracking-[0.3em] font-medium opacity-80 mb-2">Since Day One</p>
          <h2 className="text-4xl font-serif italic tracking-wide">The Kitchen Table</h2>
        </div>
      </div>

      {/* RIGHT SIDE: Scrollable Narrative */}
      <div className="lg:w-1/2 px-6 py-12 md:p-16 lg:p-24 flex flex-col justify-center">
        <div className="max-w-xl mx-auto w-full">
          
          <header className="mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-800 block mb-3">
              Who We Are
            </span>
            <h1 className="text-4xl md:text-5xl font-light text-stone-900 tracking-tight leading-tight">
              Honest ingredients. <br />
              No shortcuts.
            </h1>
          </header>

          <div className="space-y-8 text-stone-600 text-sm md:text-base leading-relaxed font-light">
            <p>
              Started in the heart of the community, Baker's Cafe began with a straightforward mission: to eliminate chemical pre-mixes and return to foundational, honest cooking. Our pizzas are made with naturally proofed dough, our burgers use scratch-made patties, and every single cake is baked fresh to order.
            </p>

            <blockquote className="border-l-2 border-amber-700 pl-4 py-1 my-6 italic text-stone-900 font-serif text-lg">
              "If it isn't exceptional enough to serve to our own families, it doesn't leave our kitchen counter."
            </blockquote>

            <p>
              We source our milk for thick shakes from local dairy cooperatives, and our seasonal ingredients come straight from regional farms. No artificial enhancers—just pure, timeless flavor crafted daily by our team of bakers and chefs.
            </p>
          </div>

          {/* Minimal Clean Details Layout */}
          <div className="mt-16 pt-8 border-t border-stone-200 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-1">Our Values</h4>
              <p className="text-xs text-stone-600 font-medium">100% scratch-made, locally sourced, additive-free.</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-1">The Experience</h4>
              <p className="text-xs text-stone-600 font-medium">Warm spaces, precise recipes, unforgettable meals.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default AboutUs;