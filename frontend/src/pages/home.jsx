import { Link } from "react-router-dom";
import TicketBanner from "../components/TicketBanner";
import { useState } from "react";

const Home = () => {
  const [hoverMove, setHoverMove] = useState();

  return (
    <div className="w-[425px] min-h-screen mx-auto z-10 poppins">
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
        >
          login
        </Link>
      </div>
      <img src="ticket-border.png" alt="" className="rotate-180 w-[425px]" />
      <div className="w-[350px] h-[280px] ml-[36.5px] rounded-md mt-12">
        <TicketBanner />
      </div>
      <ul className="grid grid-cols-4 items-center mt-40 mx-10 gap-2">
        <li className="text-center">ALL</li>
        <li className="text-center">BALLAD</li>
        <li className="text-center">ROCK</li>
        <li className="text-center">HIPHOP</li>
        <li className="text-center">JAZZ</li>
        <li className="text-center">FOLK</li>
        <li className="text-center">FESTIVAL</li>
        <li className="text-center">INDIE</li>
      </ul>
    </div>
  );
};

export default Home;
