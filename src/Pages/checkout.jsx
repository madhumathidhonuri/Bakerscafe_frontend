import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "Hyderabad",
    pincode: ""
  });
  const navigate = useNavigate();

  // ✅ Defined baseUrl dynamically to switch between local testing and your production PythonAnywhere API
  const baseUrl = import.meta.env.VITE_API_URL || "https://madhumathidhonuri.pythonanywhere.com";

  useEffect(() => {
    fetchCartForCheckout();
  }, []);

  const fetchCartForCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      // ✅ Corrected to use dynamic template string path
      const response = await axios.get(`${baseUrl}/api/cart/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setCartItems(response.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product.price.toString().replace(/[^0-9.]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Prepare data for the Order History model
    const orderData = {
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      pincode: address.pincode,
      totalAmount: calculateTotal()
    };

    try {
      // ✅ Updated endpoint route to push directly to your production live backend
      await axios.post(`${baseUrl}/api/place-order/`, orderData, {
        headers: { Authorization: `Token ${token}` },
      });

      // 2. Switch to Success UI
      setIsSuccess(true);
      
      // 3. Cleanup and redirect
      setTimeout(() => {
        navigate("/");
        window.location.reload(); // Refresh to reset global cart counters
      }, 4000);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to save order history. Make sure your Django 'place-order' URL is set up and running!");
    }
  };

  if (loading) return <div className="text-center py-20 font-bold text-slate-500 italic">Verifying your delicious choices...</div>;

  // --- SUCCESS VIEW ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner">
            ✓
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Order Saved!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Thank you, <span className="font-bold text-slate-800">{address.fullName}</span>! 
            Your order has been recorded. We're getting things ready for delivery to <span className="font-bold">Hayathnagar</span>.
          </p>
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-8">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Bill (COD)</p>
            <p className="text-4xl font-black text-emerald-600">₹{calculateTotal()}</p>
          </div>
          <button onClick={() => navigate("/")} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all">
            Explore More Food
          </button>
        </div>
      </div>
    );
  }

  // --- FORM VIEW ---
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Delivery Form */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
          <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Checkout</h2>
          <p className="text-slate-400 text-sm mb-8">Fill in your details for a fresh delivery.</p>
          
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Your Name</label>
                <input required type="text" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Enter name" onChange={(e) => setAddress({...address, fullName: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                <input required type="tel" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="10-digit number" onChange={(e) => setAddress({...address, phone: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Street / House No / Colony</label>
              <textarea required className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none h-28 transition-all" placeholder="Complete address in Hayathnagar" onChange={(e) => setAddress({...address, street: e.target.value})}></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">City</label>
                <input type="text" value="Hyderabad" disabled className="w-full p-4 rounded-2xl bg-slate-100 text-slate-400 font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Pincode</label>
                <input required type="text" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="501505" onChange={(e) => setAddress({...address, pincode: e.target.value})} />
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black py-5 rounded-[2rem] mt-4 shadow-xl hover:shadow-emerald-200 transition-all uppercase tracking-widest text-sm">
              Confirm Order & Pay ₹{calculateTotal()}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:pl-8">
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 sticky top-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-tight">Review Items</h2>
            <div className="max-h-80 overflow-y-auto space-y-4 pr-2 mb-8 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-slate-400">
                      {item.quantity}x
                    </div>
                    <p className="font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">{item.product.name}</p>
                  </div>
                  <p className="font-black text-slate-900">{item.product.price}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-50 pt-6 space-y-3">
              <div className="flex justify-between text-slate-400 font-medium text-sm">
                <span>Subtotal</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium text-sm">
                <span>Delivery</span>
                <span className="text-emerald-500 font-bold uppercase text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full tracking-wider">Free Delivery</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-slate-900 pt-4 border-t border-slate-50">
                <span>Grand Total</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-[10px] text-amber-800 font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="text-base">📍</span> Delivery Area Hayathnagar
                </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;