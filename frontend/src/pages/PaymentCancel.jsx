import React from "react";

const PaymentCancel = ({ toggleOpen }) => {

  return (
    <div className="w-[425px] min-h-screen bg-blue-200 mx-auto z-10 flex justify-center items-center">
      <p className="text-2xl"> 
        결제 실패 또는 취소
      </p>      
    </div>
  );
};

export default PaymentCancel;