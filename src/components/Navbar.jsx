import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-amber-900 text-amber-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT SIDE: Logo stays locked to the left */}
        <div className="shrink-0">
          <Link to="/" className="text-2xl font-black tracking-tighter uppercase">
            BakersCafe
          </Link>
        </div>

        {/* RIGHT SIDE: Both menu links and actions are grouped tight here */}
        <div className="flex items-center gap-12">

          {/* Main Links */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li><Link to="/" className="hover:text-amber-200 transition">Home</Link></li>
            <li><Link to="/menu" className="hover:text-amber-200 transition">Menu</Link></li>
            <li><Link to="/aboutus" className="hover:text-amber-200 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-amber-200 transition">Contact</Link></li>
          </ul>

          {/* Dynamic Action Zone (Controlled by Auth State) */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              /* --- STATE 2: SIGNED IN --- */
              <>
                <Link
                  to="/orders"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/10 transition text-sm font-medium"
                >
                  Orders
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/10 transition text-sm font-medium"
                >
                  Cart
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/10 transition text-sm font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-amber-800 border border-amber-700/50 rounded-md hover:bg-red-700 hover:border-red-600 transition text-sm font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              /* --- STATE 1: GUEST --- */
              <>
                <Link to="/login" className="text-sm font-medium hover:text-white transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-amber-900 px-4 py-1.5 rounded font-bold hover:bg-amber-50 transition shadow-sm text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;