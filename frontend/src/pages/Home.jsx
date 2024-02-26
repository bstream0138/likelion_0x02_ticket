import { Link } from "react-router-dom";
import TicketBanner from "../components/TicketBanner";
import { PiHashBold } from "react-icons/pi";

const Home = () => {
  return (
    <div className="min-w-screen md:[450px] min-h-screen mx-auto  poppins overflow-y-auto">
      <div className="w-[350px] h-[280px] mx-auto rounded-md mt-12">
        <TicketBanner />
      </div>
      <div className="mt-[162px] border-t-2 w-[370px] mx-auto border-black"></div>
      <ul className="flex items-center mt-4 mx-6  text-[16px] ">
        <Link
          to="/ticketing/1"
          className="hashtag hover:bg-[#038BD5] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          IU
        </Link>
        <Link
          to="/ticketing/1"
          className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          The Golden Hour
        </Link>

        <Link
          to="ticketing/4"
          className="hashtag hover:bg-[#038BD5] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          Hype Boy
        </Link>
      </ul>
      <ul className="flex items-center mt-4 mx-auto px-2 text-[16px]  ">
        <Link
          to="ticketing/4"
          className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          New Jeans
        </Link>
        <Link
          to="ticketing/0"
          className="hashtag hover:bg-[#038BD5] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          BTS
        </Link>
        <Link
          to="ticketing/6"
          className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          Black Pink
        </Link>
        <Link
          to="ticketing/2"
          className="hashtag hover:bg-[#038BD5] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          aespa
        </Link>
      </ul>
      <ul className="flex items-center mt-4 mx-auto text-[16px] ">
        <Link
          to="ticketing/6"
          className="hashtag hover:bg-[#fb16f3] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          BLACKPINK IN YOUR AREA
        </Link>
      </ul>
      <ul className="flex items-center mt-4 mx-auto px-3 text-[16px]">
        <Link
          to="ticketing/5"
          className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          박효신
        </Link>
        <Link
          to="ticketing/3"
          className="hashtag hover:bg-[#038BD5] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          Sneakers
        </Link>
        <Link
          to="ticketing/0"
          className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          Butter
        </Link>
        <Link
          to="ticketing/2"
          className="hashtag hover:bg-[#038BD5] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          Drama
        </Link>
      </ul>
      <ul className="flex items-center mt-4 mx-auto px-4 text-[16px]">
        <Link
          to="ticketing/3"
          className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          유나
        </Link>
        <Link
          to="ticketing/2"
          className="hashtag hover:bg-[#038BD5] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          카리나
        </Link>
        <Link
          to="ticketing/0"
          className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          V
        </Link>
        <Link
          to="ticketing/3"
          className="hashtag hover:bg-[#038BD5] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          대장님
        </Link>
        <Link
          to="ticketing/4"
          className="hashtag hover:bg-[#FBAE16] hover:text-white duration-150"
        >
          <span className="mb-1">
            <PiHashBold />
          </span>
          해린
        </Link>
      </ul>
    </div>
  );
};

export default Home;
