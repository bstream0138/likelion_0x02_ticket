import { Link, useOutletContext } from "react-router-dom";
import TicketBanner from "../components/TicketBanner";
import { useEffect, useState } from "react";
import { PiWalletBold, PiHashBold } from "react-icons/pi";

const Home = () => {
  const { userInfo, account } = useOutletContext();
  const [hoverMove, setHoverMove] = useState(false);

  useEffect(() => {
    console.log(userInfo);
    console.log(account);
  }, []);

  return (
    <div className="w-[425px] h-[80vh] mx-auto z-10 poppins overflow-y-auto">
      <div className="flex items-center justify-between text-2xl font-bold h-[80px] pt-8 bg-[#038BD5] py-5 ">
        <img
          src="logo.png"
          alt="logo"
          className="w-[180px] h-[140px] -rotate-12 sticky z-20 mb-2"
        />
        {account ? (
          <div className="flex text-sm mr-6">
            <PiWalletBold className="text-lg" /> : {account.substring(0, 7)}
            ...{account.substring(account.length - 5)}
          </div>
        ) : (
          <Link
            to="/login"
            className={
              hoverMove
                ? "flex items-center mr-6 mb-3 justify-end mt-[13px] border-2 border-[#bcbcbc] py-1 px-[10px] rounded-full text-black bg-white"
                : "flex items-center mr-6 mb-3 justify-end mt-[10px] border-2 border-b-[5px] border-[#bcbcbc]  py-1 px-[10px] rounded-full text-black bg-white"
            }
            onMouseEnter={() => setHoverMove(true)}
            onMouseLeave={() => setHoverMove(false)}
          >
            Login
          </Link>
        )}
      </div>
      <img src="ticket-head.png" alt="" className=" w-[425px]" />
      <div className="w-[350px] h-[280px] ml-[36.5px] rounded-md mt-12">
        <TicketBanner />
      </div>
      <div className="mt-[162px] border-t-2 border-black"></div>
      <ul className="flex items-center mt-4 mx-10 gap-3">
        <Link
          to="/ticketing/1"
          className="hashtag hover:bg-[#038BD5] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          IU
        </Link>
        <button className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          The Golden Hour
        </button>

        <button className="hashtag hover:bg-[#038BD5] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          박효신
        </button>
      </ul>
      <ul className="flex items-center mt-4 mx-auto gap-3 ">
        <button className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          New Jeans
        </button>
        <button className="hashtag hover:bg-[#038BD5] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          BTS
        </button>
        <button className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          Black Pink
        </button>
        <button className="hashtag hover:bg-[#038BD5] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          aespa
        </button>
      </ul>
      <ul className="flex items-center mt-4 mx-auto gap-3 ">
        <button className="hashtag hover:bg-[#fb16f3] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          BLACKPINK IN YOUR AREA
        </button>
      </ul>
      <ul className="flex items-center mt-4 mx-auto gap-3">
        <button className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          Hype Boy
        </button>
        <button className="hashtag hover:bg-[#038BD5] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          Sneakers
        </button>
        <button className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          Butter
        </button>
        <button className="hashtag hover:bg-[#038BD5] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          Drama
        </button>
      </ul>
      <ul className="flex items-center mt-4 mx-auto gap-3">
        <button className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          유나
        </button>
        <button className="hashtag hover:bg-[#038BD5] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          카리나
        </button>
        <button className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          V
        </button>
        <button className="hashtag hover:bg-[#038BD5] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          대장님
        </button>
        <button className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150">
          <span className="mb-1">
            <PiHashBold />
          </span>
          해린
        </button>
      </ul>
    </div>
  );
};

export default Home;
