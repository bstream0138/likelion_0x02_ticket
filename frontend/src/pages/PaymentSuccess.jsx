import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

import Mint from "../components/Mint";
import Web3 from "web3";

const PaymentSuccess = ({ toggleOpen }) => {
  const { account, setAccount, preEventContract, web3, setWeb3 } = useOutletContext();
  
  useEffect(() => {
    // 결제 성공 시, localStorage의 customerID와 concertID로 구매 정보 생성
    const customerID = localStorage.getItem("customerID");
    const concertID = localStorage.getItem("concertID");

    const insertPurchase = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/purchase`, {
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


    const _web3 = new Web3(window.ethereum);
    setWeb3(_web3);
    const _account = localStorage.getItem('backupAccount');
    setAccount(_account);

  }, []);

  return (
    <div className="w-[425px] h-[80vh]  mx-auto ">
      <div className="pt-10">
        <img src="ticket-border.png" alt="" />
        <ul className="w-[425px] h-[120px] flex items-center justify-center  bg-[#038BD5]">
          <p className="text-4xl">결제 성공 !!</p>
        </ul>
        <Mint />
      </div>
    </div>
  );
};

export default PaymentSuccess;
