import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MintModal from "../components/MintModal";

const PaymentSuccess = ({ toggleOpen }) => {
  

  return (
    <div className="w-[425px] min-h-screen bg-blue-200 mx-auto z-10 flex justify-center items-center">
      <p className="text-2xl">
        결제 성공 !!        
      </p>      
    </div>
  );
};

export default PaymentSuccess;
