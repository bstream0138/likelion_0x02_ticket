import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = ({ toggleOpen, concertInfo }) => {
  const navigate = useNavigate();

  // 아래는 카카오페이 테스트를 위한 샘플 상품 코드
  const price = 150000;
  const [quantity, setQuantity] = useState(1);

  const handlePayment = async () => {
    // 카카오로그인이면 카카오페이로 이동, 메타마스크 로그인이면 바로 결제 성공
    const loginFrom = localStorage.getItem("loginFrom");
    localStorage.setItem("concertID", concertInfo.ID);
    localStorage.setItem("paymentAttempt", 1);

    if (loginFrom === "K") {
      try {
        // 백엔드 서버의 결제 준비 API 주소
        const backendURL = "http://localhost:3001/payReady";

        const total_amount = quantity * price; // 총 결제 금액 계산

        // 결제 요청 정보
        const paymentRequest = {
          item_name: concertInfo.CONTENT,
          total_amount: total_amount, // 총 결제 금액
          quantity: quantity, // 상품 수량
        };

        // 결제 준비 요청
        const response = await axios.post(backendURL, paymentRequest, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { next_redirect_pc_url } = response.data;
        window.location.href = next_redirect_pc_url;
      } catch (error) {
        console.error(error);
      }
    } else if (loginFrom === "M") {
      //console.log('Payment.jsx/handlePayment/customerID: ', localStorage.getItem("customerID"));
      //console.log('Payment.jsx/handlePayment/concertID: ', localStorage.getItem("concertID"));
      navigate("/payment_success");
    } else {
      alert("You need to login");
      navigate("/login");
    }
  };

  return (
    <div className="bg-opacity-40 bg-black w-full h-full top-0 left-0 fixed z-20">
      <div className="h-[304px] fixed top-[200px] bg-black ml-2 mt-2 w-[404px] left-1/2 -translate-x-1/2"></div>
      <div className="flex flex-col items-center justify-center h-[300px] px-4 py-2 fixed top-[200px] bg-white border w-[400px] left-1/2 -translate-x-1/2 z-20 ">
        <div className="w-full max-w-xs mb-8">
          <div className="border-b-2 border-black mb-4">
            <div className="flex justify-between py-2">
              <div className="font-bold">공연일자:</div>
              <div>{concertInfo.DATE}</div>
            </div>
            <div className="flex justify-between py-2">
              <div className="font-bold">가격:</div>
              <div>{concertInfo.PRICE}원</div>
            </div>
          </div>
        </div>
        <div className="space-y-4 w-full max-w-xs">
          <button
            className="flex items-center justify-center border-2 border-b-[5px] border-r-[5px] border-black  py-1 px-[6px] rounded-md text-2xl w-full hover:bg-[#038BD5] hover:text-white duration-150 "
            onClick={handlePayment}
          >
            구매하기
          </button>
          <button
            className="flex items-center justify-center border-2 border-b-[5px] border-r-[5px] border-black  py-1 px-[6px] rounded-md text-2xl w-full hover:bg-[#FBAE16] hover:text-white duration-150"
            onClick={toggleOpen}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
