import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/order-history/", {
        headers: { Authorization: `Token ${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-xl font-bold text-slate-400 animate-pulse">
          Fetching your order history...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
            My <span className="text-emerald-600">Orders</span>
          </h1>
          <p className="text-slate-500 mt-2">Track your past treats from Baker's Cafe.</p>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded-[3rem] shadow-sm text-center border border-slate-100">
            <div className="text-6xl mb-4">🥐</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No orders yet!</h2>
            <p className="text-slate-400 mb-8">Your order history is empty. Start shopping to see your orders here.</p>
            <button 
              onClick={() => navigate("/")}
              className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-600 transition-all"
            >
              Order Something Fresh
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-6">
                  <div className="bg-emerald-50 text-emerald-700 w-16 h-16 rounded-2xl flex flex-col items-center justify-center">
                    <span className="text-xs font-black uppercase">Order</span>
                    <span className="text-xl font-bold">#{order.id}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Date</p>
                    <p className="text-lg font-bold text-slate-800">{order.date}</p>
                  </div>
                </div>

                <div className="flex gap-10 text-center md:text-left">
                  <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Status</p>
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase mt-1">
                      {order.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Total</p>
                    <p className="text-xl font-black text-slate-900">₹{order.total}</p>
                  </div>
                </div>

                <button 
                  className="w-full md:w-auto bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-3 px-6 rounded-xl transition-colors"
                  onClick={() => alert("Detailed view coming soon!")}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;