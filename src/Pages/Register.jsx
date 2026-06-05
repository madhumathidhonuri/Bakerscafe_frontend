import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Connects to the Django URL we defined earlier
      await axios.post("http://127.0.0.1:8000/api/register/", formData);
      
      // On success, redirect to login
      navigate("/profile");
    } catch (err) {
      // Handles errors returned from Django (e.g., email already exists)
      setError(err.response?.data?.email?.[0] || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl shadow-sm p-8 sm:p-10 space-y-8">
        
        <header className="text-center">
          <h1 className="text-3xl font-black text-amber-900 tracking-tight uppercase">Join the Cafe</h1>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative border-b border-gray-200 focus-within:border-amber-900 transition-colors py-1">
            <label className="block text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-transparent border-none p-0 text-zinc-800 focus:ring-0 text-sm outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative border-b border-gray-200 focus-within:border-amber-900 transition-colors py-1">
            <label className="block text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-none p-0 text-zinc-800 focus:ring-0 text-sm outline-none"
            />
          </div>

          {/* Phone */}
          <div className="relative border-b border-gray-200 focus-within:border-amber-900 transition-colors py-1">
            <label className="block text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Phone</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-transparent border-none p-0 text-zinc-800 focus:ring-0 text-sm outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative border-b border-gray-200 focus-within:border-amber-900 transition-colors py-1">
            <label className="block text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-transparent border-none p-0 text-zinc-800 focus:ring-0 text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-900 hover:bg-amber-800 text-amber-50 font-bold py-3.5 rounded-xl transition-all duration-200 text-xs uppercase tracking-widest"
          >
            Create Account
          </button>
        </form>

        <footer className="text-center pt-2 border-t border-gray-100 text-xs text-zinc-500">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-900 font-bold hover:underline">Log in</Link>
        </footer>
      </div>
    </div>
  );
}

export default Register;