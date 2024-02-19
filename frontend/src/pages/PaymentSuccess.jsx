import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MintModal from "../components/MintModal";

const PaymentSuccess = ({ toggleOpen }) => {
  useEffect( () => {
    let purchaseDone = true;

    // 결제 성공 시, localStorage의 customerID와 concertID로 구매 정보 생성
    const customerID = localStorage.getItem("customerID");
    const concertID = localStorage.getItem("concertID");
    
    const insertPurchase = async () => {
      if (!purchaseDone) return;

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

    if ( customerID && concertID ) {
      console.log('PaymentSuccess/useEffect/customerID: ', customerID);
      console.log('PaymentSuccess/useEffect/concertID: ', concertID);
      insertPurchase();
    }

    // React 컴포넌트의 mount, unmount 개념 확실히 알기. 
    // 아래는 useEffect가 중복 수행될 때 중복 구매되지 않도록 하는 임시코드
    return () => {
      purchaseDone = false; 
    };

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
