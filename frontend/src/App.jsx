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

//components
import Layout from "./components/Layout";
import My from "./pages/My";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* pages using Kakao API*/}
        <Route path="/" element={<LoginPage />} />

        {/* App */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/ticketing" element={<Ticketing />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/my" element={<My />} />
          <Route path="/createaddress" element={<CreateAddress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
