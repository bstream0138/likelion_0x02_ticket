import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const My = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //localStorage에서 item 삭제
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-[425px] min-h-screen bg-blue-200 mx-auto">
      <ul className="">
        <button
          className="mt-4 bg-black text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default My;
