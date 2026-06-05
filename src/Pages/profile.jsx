import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Send the token in the Headers so Django knows WHO is asking
        const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Profile Header */}
        <div className="bg-amber-900 px-8 py-10 text-center">
          <div className="w-24 h-24 bg-amber-50 rounded-full mx-auto flex items-center justify-center text-3xl shadow-inner mb-4">
            👤
          </div>
          <h1 className="text-2xl font-black text-amber-50 uppercase tracking-tight">
            My Profile
          </h1>
          <p className="text-amber-200/70 text-[10px] uppercase tracking-widest font-bold mt-1">
            Member since 2026
          </p>
        </div>

        {/* User Details */}
        <div className="p-8 space-y-6">
          <div className="border-b border-gray-50 pb-4">
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Username</label>
            <p className="text-zinc-800 font-semibold">{user?.username}</p>
          </div>

          <div className="border-b border-gray-50 pb-4">
            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Email Address</label>
            <p className="text-zinc-800 font-semibold">{user?.email}</p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 flex items-center gap-4">
            <div className="text-2xl">☕</div>
            <div>
              <p className="text-[10px] uppercase font-black text-amber-900 tracking-tighter">Loyalty Status</p>
              <p className="text-xs text-amber-800/80 font-medium italic">Your coffee rewards are brewing...</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/menu")}
            className="w-full bg-amber-900 hover:bg-amber-800 text-amber-50 font-bold py-3.5 rounded-xl transition-all duration-200 text-xs uppercase tracking-widest shadow-md active:scale-95"
          >
            Go to Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;