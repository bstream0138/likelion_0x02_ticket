import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import PaymentPage from './pages/PaymentPage';
//components


//import { useEffect, useState } from "react";
//import { Navigate } from "react-router-dom";
//import axios from "axios";
//import AccountInfo from './components/AccountInfo';
//import KakaoLogin from './components/KakaoLogin';
//import KakaoLogin2 from "./components/KakaoLogin2";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/pay" element={<PaymentPage/>} />
      </Routes>
    </BrowserRouter>      
  );


}

export default App;
