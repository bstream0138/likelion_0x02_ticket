import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MintModal from "../components/MintModal";

const PaymentSuccess = ({ toggleOpen }) => {
  useEffect(() => {
    // 결제 성공 시, localStorage의 customerID와 concertID로 구매 정보 생성
    const customerID = localStorage.getItem("customerID");
    const concertID = localStorage.getItem("concertID");

    const insertPurchase = async () => {
      try {
        const response = await axios.post("http://localhost:3001/purchase", {
          customerID,
          concertID,
        });

        if (response.data) {
          console.log("Purchase added: ", response.data);
          localStorage.removeItem("concertID");
        }
      } catch (error) {
        console.error("[ERR] PaymentSuccess/insertPurchase: ", error);
      }
    };

    console.log("PaymentSuccess/useEffect/customerID: ", customerID);
    console.log("PaymentSuccess/useEffect/concertID: ", concertID);

    if (customerID && concertID) {
      insertPurchase();
    }
  }, []);

  return (
    <div className="w-[425px] h-[100vh]  mx-auto ">
      <div className="pt-10">
        <img src="ticket-border.png" alt="" />
        <ul className="w-[425px] h-[120px] flex items-center justify-center  bg-[#038BD5]">
          <p className="text-4xl">결제 성공 !!</p>
        </ul>
        {/* <MintModal /> */}
      </div>
    </div>
  );
};

export default PaymentSuccess;
