import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MintModal from "./MintModal";

const PaymentPage = ({ toggleOpen }) => {
  //   const navigate = useNavigate();

  // 아래는 카카오페이 테스트를 위한 샘플 상품 코드
  const price = 150000;
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const handlePayment = async () => {
    try {
      //나중에 로직의 맨 아래로 이동 구매 성공했을때 민팅하기 모달
      setIsOpen(!isOpen);

      // 백엔드 서버의 결제 준비 API 주소
      const backendURL = "http://localhost:3001/payReady";

      const total_amount = quantity * price; // 총 결제 금액 계산

      // 결제 요청 정보
      const paymentRequest = {
        item_name: "iu_golden_hour",
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
  };

  return (
    <div className="bg-opacity-40 bg-black w-full h-full top-0 left-0 fixed z-20">
      <div className="flex flex-col items-center justify-center h-[770px] px-4 py-2 fixed top-[10px] bg-white border w-[400px] left-1/2 -translate-x-1/2 z-20 rounded-md">
        <img
          src="/golden_hour.jpg"
          alt="IU Concert"
          className="w-full max-w-xs mb-8"
        />
        {isOpen && <MintModal toggleOpen={toggleOpen} />}
        {/*구매하기 버튼을 눌렀을때 민팅하기와 나중에 하기 버튼 */}
        <div className="w-full max-w-xs mb-8">
          <div className="border-b border-gray-200 mb-4">
            <div className="flex justify-between py-2">
              <div className="font-semibold">공연일자:</div>
              <div>2023년 9월 13일</div>
            </div>
            <div className="flex justify-between py-2">
              <div className="font-semibold">가격:</div>
              <div>{price}원</div>
            </div>
          </div>
        </div>
        <div className="space-y-4 w-full max-w-xs">
          <button
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg"
            onClick={handlePayment}
          >
            구매하기
          </button>
          <button
            className="w-full bg-gray-500 text-white font-bold py-3 rounded shadow"
            onClick={toggleOpen}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
