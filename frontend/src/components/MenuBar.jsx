import { Link } from "react-router-dom";
import { IoHomeSharp, IoPerson, IoTicketOutline } from "react-icons/io5";

const MenuBar = () => {
  return (
    <div className="sticky bottom-0 poppins text-xl">
      <div className="w-[447px] mx-auto bottom-0 sticky h-[70px] z-10 header ">
        <img
          className="fixed -top-1 content"
          src="bottom-border.png"
          alt="bottom"
        />
        <ul className="flex bg-[#FBAE16] items-center h-full  justify-between px-6">
          <ul className="">
            <Link
              className="hover:text-white duration-150 flex flex-col justify-center items-center"
              to="/"
            >
              <IoHomeSharp />
              HOME
            </Link>
          </ul>
          <ul className="mr-3">
            <Link
              className="hover:text-white duration-150 flex flex-col justify-center items-center"
              to="/ticket"
            >
              <IoTicketOutline />
              TICKET
            </Link>
          </ul>
          <ul>
            <Link
              className="hover:text-white duration-150 flex flex-col justify-center items-center mr-2"
              to="/my"
            >
              <IoPerson />
              MY
            </Link>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
