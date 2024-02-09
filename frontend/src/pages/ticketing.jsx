import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import PaymentPage from "../components/PaymentPage";

const Ticketing = () => {
  // LoginPage에서 사용한 login 방법 확인
  const { userInfo, account } = useOutletContext();
  const loginMethod = localStorage.getItem("loginMethod");
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);

  // for Kakao Login

  const handleGoHome = () => {
    navigate("/home");
  };

  const toggleOpen = () => {
    if (!account) {
      alert("You need to login");
      return;
    }
    setIsModal(!isModal);
  };

  return (
    <div className="w-[425px] min-h-screen  mx-auto">
      <div>
        {loginMethod === "K" ? (
          <div>
            <li className="text-lg font-semibold">UserID: {userInfo.userID}</li>
            <li className="text-lg font-semibold">
              UserName: {userInfo.userName}
            </li>
          </div>
        ) : (
          <div>
            <h1 className="text-lg font-semibold">Metamask Account Info</h1>
            <p className="text-lg">
              <span>
                {account.substring(0, 7)}...
                {account.substring(account.length - 5)}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center font-bold text-2xl py-4 header">
        <button
          onClick={handleGoHome}
          className="fixed content text-xl left-0 bg-gray-500 text-white py-1 px-1 rounded shadow"
        >
          back
        </button>
        TICKET
      </div>

      <div className="header">
        <ul className="w-[425px] overflow-hidden h-[200px] object-contain header ">
          <img className=" opacity-60 blur-sm" src="/golden_hour.jpg" alt="" />
        </ul>
        <img
          className="fixed top-[62px] left-[30px] w-[150px] content rounded-md content"
          src="/golden_hour.jpg"
          alt=""
        />
      </div>
      <ul className=" pt-4 flex justify-end px-4 pr-[60px]">
        <button
          className="border-black border rounded-md px-2 py-1 mt-[2px] font-bold text-3xl"
          onClick={toggleOpen}
        >
          예매하기
        </button>
        {isModal && <PaymentPage toggleOpen={toggleOpen} />}
      </ul>
      <div className="mt-8 px-5">
        <ul className="text-3xl ">2024 콘서트</ul>
        <ul className="text-xs font-light">진짜 끝내주는 콘서트 - 120분</ul>
        <ul className="text-sm mt-1">장소</ul>
        <ul className="text-sm">2024.02.29~2024.03.01</ul>
      </div>
      <div className="px-5 text-2xl font-bold mt-3">CASTING</div>
    </div>
  );
};

export default Ticketing;
