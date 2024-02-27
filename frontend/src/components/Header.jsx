import { PiWalletBold } from "react-icons/pi";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ account }) => {
  const [hoverMove, setHoverMove] = useState(false);

  return (
    <div className="sticky poppins top-0 z-10 min-w-screen md:w-[450px] mx-auto ">
      <div className="flex items-center justify-between text-2xl font-bold h-[80px] pt-8 bg-[#038BD5] py-5 min-w-screen md:w-[450px] mx-auto header">
        <Link to="/">
          <img
            src="logo.png"
            alt="logo"
            className="w-[180px] h-[140px] -rotate-12 sticky mb-2"
          />
        </Link>
        {account ? (
          <div className="flex text-sm mr-12">
            <PiWalletBold className="text-sm mt-[1px]" /> :{" "}
            {account.substring(0, 7)}
            ...{account.substring(account.length - 5)}
          </div>
        ) : (
          <Link
            to="/login"
            className={
              hoverMove
                ? "flex items-center mr-12 mb-3 justify-end mt-[6px] border-2 border-[#bcbcbc] py-1 px-[10px] rounded-full text-black bg-white"
                : "flex items-center mr-12 mb-3 justify-end mt-[3px] border-2 border-b-[5px] border-[#bcbcbc]  py-1 px-[10px] rounded-full text-black bg-white"
            }
            onMouseEnter={() => setHoverMove(true)}
            onMouseLeave={() => setHoverMove(false)}
          >
            Login
          </Link>
        )}
      </div>
      <img
        src="ticket-head.png"
        alt=""
        className="min-w-screen md:w-[450px] content"
      />
    </div>
  );
};

export default Header;
