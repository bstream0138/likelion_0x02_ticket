import { Link } from "react-router-dom";
import TicketBanner from "../components/TicketBanner";
import { PiHashBold } from "react-icons/pi";

const Home = () => {
  return (
    <div className="min-w-screen min-h-screen mx-auto z-10 poppins overflow-y-auto">
      <div className="w-[350px] h-[280px] mx-auto rounded-md mt-12">
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
