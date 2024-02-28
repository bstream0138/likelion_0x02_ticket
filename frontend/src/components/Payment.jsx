import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 사용자의 실행환경이 PC인지 모바일인지 확인
const checkIsMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

const Payment = ({ toggleOpen, account, concertInfo }) => {
  const [hoverPurchase, setHoverPurchase] = useState();
  const [hoverBack, setHoverBack] = useState();
  const navigate = useNavigate();

  // 아래는 카카오페이 테스트를 위한 샘플 상품 코드
  const price = concertInfo.PRICE;
  const [quantity, setQuantity] = useState(1);

  const handlePayment = async () => {
    // 카카오로그인이면 카카오페이로 이동, 메타마스크 로그인이면 바로 결제 성공
    const loginFrom = localStorage.getItem("loginFrom");
    localStorage.setItem("concertID", concertInfo.ID);

    // Backend 서버 구동 중이면, 카카오페이 결제 진행
    const connectDB = localStorage.getItem("connectDB");

    if (connectDB === "X") {
      navigate("/payment_success");
    } else {
      // 페이지 전환 전에 account 정보 localStorage에 저장
      localStorage.setItem("backupAccount", account);

      try {
        // 백엔드 서버의 결제 준비 API 주소
        const backendURL = `${process.env.REACT_APP_BACKEND_URL}/payReady`;

        const total_amount = quantity * price; // 총 결제 금액 계산
        const isMobile = checkIsMobile();

        console.log("Payment/isMobile: ", isMobile);

        // 결제 요청 정보
        const paymentRequest = {
          item_name: concertInfo.CONTENT,
          total_amount: total_amount, // 총 결제 금액
          quantity: quantity, // 상품 수량
          is_mobile: isMobile, // 모바일이면 true, PC이면 false
        };

        // 결제 준비 요청
        const response = await axios.post(backendURL, paymentRequest, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("KAKAO PAY RESPONSE: ", response);
        const { next_redirect_url } = response.data;
        window.location.href = next_redirect_url;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-opacity-40 bg-black w-full h-full top-0 left-0 fixed z-20">
      <div className="h-[304px] fixed top-[200px] bg-black ml-2 mt-2 w-[404px] left-1/2 -translate-x-1/2"></div>
      <div className="flex flex-col items-center justify-center h-[300px] px-4 py-2 fixed top-[200px] bg-white border w-[400px] left-1/2 -translate-x-1/2 z-20 ">
        <div className="w-full max-w-xs mb-4">
          <div className="border-b-2 border-black mb-2">
            <div className="flex justify-between py-2">
              <div className="font-semibold">공연일자:</div>
              <div>{concertInfo.DATE}</div>
            </div>
            <div className="flex justify-between py-2 mb-2">
              <div className="font-bold">가격:</div>
              <div>{concertInfo.PRICE.toLocaleString("ko-KR")}원</div>
            </div>
          </div>
        </div>
        <div className="space-y-4 w-full max-w-xs">
          <div>
            <button
              className={
                hoverPurchase
                  ? "flex items-center justify-center mt-[12px] ml-[3px] border-2 w-full border-black py-1 px-[6px] rounded-md text-3xl  duration-100 hover:bg-[#038BD5] hover:text-white ]   "
                  : "flex items-center justify-center mt-[9px]  border-2 border-b-[5px] border-r-[5px] w-full border-black  py-1 px-[6px] rounded-md text-3xl bg-[#038BD5] text-white  duration-10"
              }
              onMouseEnter={() => setHoverPurchase(true)}
              onMouseLeave={() => setHoverPurchase(false)}
              onClick={handlePayment}
            >
              구매하기
            </button>

            <button
              className={
                hoverBack
                  ? "flex items-center justify-center mt-[12px] ml-[3px] border-2 w-full border-black py-1 px-[6px] rounded-md text-3xl  duration-100 sig-yellow-h] "
                  : "flex items-center justify-center mt-[9px]  border-2 border-b-[5px] border-r-[5px] w-full border-black  py-1 px-[6px] rounded-md text-3xl sig-yellow  duration-100"
              }
              onMouseEnter={() => setHoverBack(true)}
              onMouseLeave={() => setHoverBack(false)}
              onClick={toggleOpen}
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
