import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { useEffect, useState } from "react";
//import { Navigate } from "react-router-dom";
//import axios from "axios";

//pages
import Home from "./pages/Home";
import Ticketing from "./pages/Ticketing";
import Ticket from "./pages/Ticket";

import KakaoLoginSuccess from "./pages/LoginSuccess";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";


//components
import Layout from "./components/Layout";
import My from "./pages/My";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* App */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ticketing/:index" element={<Ticketing />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/my" element={<My />} />

          {/* pages using Kakao API*/}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login_success" element={<KakaoLoginSuccess />} />
          <Route path="/payment_success" element={<PaymentSuccess />} />
          <Route path="/payment_fail" element={<PaymentCancel />} />
          <Route path="/payment_cancel" element={<PaymentCancel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
