import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { useEffect, useState } from "react";
//import { Navigate } from "react-router-dom";
//import axios from "axios";


//pages
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/PaymentPage';

import Home from "./pages/home";
import Ticketing from "./pages/ticketing";
import MyProfile from "./pages/myprofile";
import Collection from "./pages/collection";
import MyTicket from "./pages/myticket";
import Wishlist from "./pages/wishlist";

import CreateAddress from "./pages/createaddress";

//components
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes element={<Layout />}>
        {/* pages using Kakao API*/}
        <Route path="/" element={<LoginPage/>} />
        <Route path="/pay" element={<PaymentPage/>} />

        {/* App */}
        <Route path="/home" element={<Home />} />
        <Route path="/ticketing" element={<Ticketing />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/myticket" element={<MyTicket />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/testaddr" element={<CreateAddress />} />
      </Routes>
    </BrowserRouter>      
  );


}

export default App;
