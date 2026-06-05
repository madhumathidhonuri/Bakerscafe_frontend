import React, { useState } from "react";
import axios from 'axios';
import contactBgImage from "../assets/Background_image.jpg";

function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // NEW: State for showing status messages
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", msg: "Sending..." });

    try {
      await axios.post('http://127.0.0.1:8000/api/contact/', formData);
      
      // Show success message
      setStatus({ type: "success", msg: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });

      // Optional: Clear success message after 5 seconds
      setTimeout(() => setStatus({ type: "", msg: "" }), 5000);

    } catch (err) {
      console.error("Connection Error:", err);
      // Show error message
      setStatus({ type: "error", msg: "Please try later" });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 font-sans antialiased flex flex-col lg:flex-row">
      
      {/* LEFT SIDE: Visual Panel */}
      <div className="lg:w-1/2 h-[40vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden relative flex flex-col justify-end p-8 md:p-12 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url(${contactBgImage})` }}
        ></div>
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]"></div>

        <div className="relative z-10 space-y-6 max-w-sm">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400 block mb-1">Visit Us</span>
            <p className="text-sm font-light leading-relaxed text-stone-100">
              12, Jubilee Hills, Road No. 36,<br />
              Hyderabad, Telangana, 500033
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400 block mb-1">Call</span>
              <p className="text-sm font-light text-stone-100">+91 40 2345 6789</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400 block mb-1">Write</span>
              <p className="text-sm font-light text-stone-100">hello@bakerscafe.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Contact Form */}
      <div className="lg:w-1/2 px-6 py-12 md:p-16 lg:p-24 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <header className="mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-800 block mb-3">Get In Touch</span>
            <h1 className="text-4xl font-light text-stone-900 tracking-tight leading-tight">
              We look forward <br />to your message.
            </h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Input */}
            <div className="relative border-b border-stone-200 focus-within:border-stone-800 transition-colors py-2">
              <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-none p-0 text-stone-800 focus:ring-0 text-sm outline-none"
                placeholder="Your name"
              />
            </div>

            {/* Email Input */}
            <div className="relative border-b border-stone-200 focus-within:border-stone-800 transition-colors py-2">
              <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-none p-0 text-stone-800 focus:ring-0 text-sm outline-none"
                placeholder="yourname@domain.com"
              />
            </div>

            {/* Message Input */}
            <div className="relative border-b border-stone-200 focus-within:border-stone-800 transition-colors py-2">
              <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Message</label>
              <textarea
                rows="3"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-none p-0 text-stone-800 focus:ring-0 text-sm resize-none outline-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            {/* STATUS MESSAGE AREA */}
            {status.msg && (
              <div className={`text-xs font-bold uppercase tracking-widest p-3 rounded ${
                status.type === "success" ? "text-green-600 bg-green-50" : 
                status.type === "error" ? "text-red-600 bg-red-50" : "text-stone-500"
              }`}>
                {status.msg}
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={status.type === "loading"}
                className={`w-full text-white text-xs uppercase tracking-widest font-bold py-4 rounded-xl transition-colors duration-300 shadow-md ${
                  status.type === "loading" ? "bg-stone-400 cursor-not-allowed" : "bg-stone-900 hover:bg-amber-800"
                }`}
              >
                {status.type === "loading" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contacts;