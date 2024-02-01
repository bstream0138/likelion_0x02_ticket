import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import './App.css';
//import KakaoLogin from './components/KakaoLogin';
//import KakaoLogin2 from "./components/KakaoLogin2";

import Auth from './pages/Auth';
import Profile from "./pages/Profile";

function App() {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<a href={KAKAO_AUTH_URL}>Kakao Login</a>} />
          <Route path="/login" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>      
    </div>
  );

}

/*
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<KakaoLogin2 />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>      
    </div>
  );
}
*/

export default App;
