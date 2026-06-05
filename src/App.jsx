import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Pizzas from "./Pages/Pizzas";
import Burgers from "./Pages/Burgers";
import Pasta from "./Pages/Pasta";
import Cakes from "./Pages/Cakes";
import Shakes from "./Pages/Shakes";
import Desserts from "./Pages/Desserts";
import AboutUs from './Pages/Aboutus';
import Contacts from './Pages/contacts';
import Profile from './Pages/profile';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Orders from './Pages/Orders';
import Cart from './Pages/Cart';
import Checkout from './Pages/checkout';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/pizzas" element={<Pizzas />} />
        <Route path="/menu/burgers" element={<Burgers />} />
        <Route path="/menu/pasta" element={<Pasta />} />
        <Route path="/menu/cakes" element={<Cakes />} />
        <Route path="/menu/shakes" element={<Shakes />} />
        <Route path="/menu/desserts" element={<Desserts />} />
        <Route path="aboutus" element={<AboutUs/>}/>
        <Route path="contact" element={<Contacts/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="orders" element={<Orders/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="checkout" element={<Checkout/>}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;