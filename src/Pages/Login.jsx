import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" }); // Changed email to username to match Django
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Defined baseUrl dynamically to target your live PythonAnywhere server link
  const baseUrl = import.meta.env.VITE_API_URL || "https://madhumathidhonuri.pythonanywhere.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. ✅ Send login request to your live Django server instead of localhost
      const response = await axios.post(`${baseUrl}/api/login/`, {
        username: formData.username,
        password: formData.password,
      });

      // 2. Save the token received from Django
      localStorage.setItem("token", response.data.token);

      // 3. IMPORTANT: Tell the Navbar to update right now
      window.dispatchEvent(new Event("storage"));

      // 4. Success! Go to profile or home
      navigate("/profile");
      
    } catch (err) {
      // Handle wrong credentials or server errors
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Invalid username or password.");
      } else {
        setError("Cannot connect to server. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl shadow-sm p-8 sm:p-10 space-y-8">
        
        <header className="text-center">
          <h1 className="text-3xl font-black text-amber-900 tracking-tight uppercase">
            Welcome Back
          </h1>
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mt-2">
            Log in to access your table
          </p>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold p-4 rounded-xl text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Username Field - Match Django's User Model */}
          <div className="relative border-b border-gray-200 focus-within:border-amber-900 transition-colors py-1.5">
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">
              Username
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-transparent border-none p-0 text-zinc-800 focus:ring-0 text-sm outline-none"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div className="relative border-b border-gray-200 focus-within:border-amber-900 transition-colors py-1.5">
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-transparent border-none p-0 text-zinc-800 focus:ring-0 text-sm placeholder-zinc-300 outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-amber-900 hover:bg-amber-800 text-amber-50 font-bold py-3.5 rounded-xl transition-colors duration-200 text-xs uppercase tracking-widest shadow-md active:scale-95 transform"
            >
              Sign In
            </button>
          </div>
        </form>

        <footer className="text-center pt-2 border-t border-gray-100 text-xs text-zinc-500">
          New to BakersCafe?{" "}
          <Link to="/register" className="text-amber-900 font-bold hover:underline transition-all">
            Create an account
          </Link>
        </footer>

      </div>
    </div>
  );
}

export default Login;