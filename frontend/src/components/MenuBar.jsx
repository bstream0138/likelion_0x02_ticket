import { Link } from "react-router-dom";
import { IoHomeSharp, IoPerson, IoTicketOutline } from "react-icons/io5";

const MenuBar = () => {
  return (
    <div className="sticky bottom-0 min-w-screen mx-auto md:w-[450px] poppins text-xl z-20">
      <div className=" md:w-[450px] miw-screen mx-auto bottom-0 sticky h-[70px]  header ">
        <img
          className="fixed -top-[2px] content"
          src="bottom-border.png"
          alt="bottom"
        />
        <ul className="flex bg-[#FBAE16] items-center h-full  justify-between px-6 pt-1">
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
