import { Link, useOutletContext } from "react-router-dom";
import TicketBanner from "../components/TicketBanner";
import { useEffect, useState } from "react";
import { PiHashBold } from "react-icons/pi";

const Home = () => {
  const { userInfo, account } = useOutletContext();
  const [hoverMove, setHoverMove] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (userInfo || account) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    console.log(userInfo);
    console.log(account);
  }, []);

  return (
    <div className="w-[425px] h-[110vh] mx-auto z-10 poppins">
      <div className="flex items-center justify-between text-2xl font-bold h-[80px] pt-8 bg-[#038BD5] py-5 ">
        <img
          src="logo.png"
          alt="logo"
          className="w-[180px] h-[140px] -rotate-12 sticky z-20 mb-2"
        />
        <Link
          to="/login"
          className={
            hoverMove
              ? "flex items-center mr-14 mb-3 justify-end mt-[13px] border-2 border-[#bcbcbc] py-1 px-[10px] rounded-full text-black bg-white"
              : "flex items-center mr-14 mb-3 justify-end mt-[10px] border-2 border-b-[5px] border-[#bcbcbc]  py-1 px-[10px] rounded-full text-black bg-white"
          }
          onMouseEnter={() => setHoverMove(true)}
          onMouseLeave={() => setHoverMove(false)}
          onClick={!isLoggedIn ? handleLogin : "cursor-not-allowed"}
        >
          login
        </Link>
      </div>
      <img src="ticket-head.png" alt="" className=" w-[425px]" />
      <div className="w-[350px] h-[280px] ml-[36.5px] rounded-md mt-12">
        <TicketBanner />
      </div>
      <div className="mt-[162px] border-t-2 border-black"></div>

      <ul className="grid grid-cols-4 items-center mt-4  mx-10 gap-2 ">
        <Link
          to="/ticketing/1"
          className="hashtag hover:bg-[#038BD5] ml-5 w-[58px] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          IU
        </Link>
        <button className="hashtag hover:bg-[#FBAE16] mx-1  hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          ITZY
        </button>
        <button className="hashtag hover:bg-[#038BD5]  hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          박효신
        </button>
        <button className="hashtag hover:bg-[#FBAE16] ml-2 hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          BTS
        </button>
        <button className="hashtag hover:bg-[#038BD5] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          aespa
        </button>
        <button className="hashtag w-[108px] hover:bg-[#FBAE16] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          New Jeans
        </button>
        <button className="hashtag w-[107px] ml-[25px] hover:bg-[#038BD5] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          Black Pink
        </button>
      </ul>
    </div>
  );
};

export default Home;
