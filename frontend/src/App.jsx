import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { useEffect, useState } from "react";
//import { Navigate } from "react-router-dom";
//import axios from "axios";

//pages

import Home from "./pages/Home";
import Ticketing from "./pages/Ticketing";
import Ticket from "./pages/Ticket";
import CreateAddress from "./pages/CreateAddress";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";


//components
import Layout from "./components/Layout";
import My from "./pages/My";
import LoginPage from "./pages/LoginPage";
import AdminFilter from "./pages/AdminFilter";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* pages using Kakao API*/}
        <Route path="/login" element={<LoginPage />} />

        {/* App */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ticketing/:index" element={<Ticketing />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/my" element={<My />} />
          <Route path="/createaddress" element={<CreateAddress />} />

          <Route path="/payment_success" element={<PaymentSuccess />} />
          <Route path="/payment_fail" element={<PaymentCancel />} />
          <Route path="/payment_cancel" element={<PaymentCancel />} />
          
          <Route path="/adminfilter" element={<AdminFilter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
