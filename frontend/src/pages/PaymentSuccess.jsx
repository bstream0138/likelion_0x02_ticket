import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MintModal from "../components/MintModal";

const PaymentSuccess = ({ toggleOpen }) => {
  useEffect( () => {

    // 결제 성공 시, localStorage의 customerID와 concertID로 구매 정보 생성
    const customerID = localStorage.getItem("customerID");
    const concertID = localStorage.getItem("concertID");
    
    const insertPurchase = async () => {
      try {
        const response = await axios.post('http://localhost:3001/purchase', {
          customerID,
          concertID
        });

        if (response.data) {
          console.log('Purchase added: ', response.data);
          localStorage.removeItem('concertID');
        }

      } catch (error) {
        console.error('[ERR] PaymentSuccess/insertPurchase: ', error);
      }

    };
    
    console.log('PaymentSuccess/useEffect/customerID: ', customerID);
    console.log('PaymentSuccess/useEffect/concertID: ', concertID);

    if ( customerID && concertID ) {      
      insertPurchase();
    }


  }, []);

  return (
    <div className="w-[425px] min-h-screen bg-blue-200 mx-auto z-10 flex justify-center items-center">
      <p className="text-2xl">
        결제 성공 !!        
      </p>      
    </div>
  );
};

export default PaymentSuccess;
