import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = ({ toggleOpen }) => {
  const [hoverLater, setHoverLater] = useState(false);
  const navigate = useNavigate();

  // 결제 시도했던 concertID 초기화
  localStorage.removeItem("concertID");

  return (
    <div className="min-h-screen min-w-screen mx-auto">
      <div className="pt-10">
        <img src="fail-border.png" alt="" />
        <ul className="w-[425px] h-[370px] flex items-center justify-center flex-col gap-12  bg-[#AB161E]">
          <p className="text-4xl">결제 실패 또는 취소</p>
          <button
            className={
              hoverLater
                ? "flex items-center mb-3 justify-end mt-[13px] border-2 border-[#bcbcbc] py-1 px-[10px] rounded-full text-black bg-white"
                : "flex items-center mb-3 justify-end mt-[10px] border-2 border-b-[5px] border-[#bcbcbc]  py-1 px-[10px] rounded-full text-black bg-white"
            }
            onClick={() => navigate("/")}
            onMouseEnter={() => setHoverLater(true)}
            onMouseLeave={() => setHoverLater(false)}
          >
            돌아가기
          </button>
        </ul>
        <img src="fail-head.png" alt="" />
      </div>
    </div>
  );
};

export default PaymentCancel;
