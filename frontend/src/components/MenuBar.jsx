import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <div className="sticky bottom-0 poppins text-xl">
      <div className="w-[425px] mx-auto bottom-0 sticky h-[50px] z-10 header ">
        <img
          className="fixed -top-1 content"
          src="bottom-border.png"
          alt="bottom"
        />
        <ul className="flex bg-[#FBAE16] items-center h-full  justify-between px-4">
          <ul className="">
            <Link to="/">HOME</Link>
          </ul>
          <ul className="mr-6">
            <Link to="/ticket">TICKET</Link>
          </ul>

          <ul>
            <Link to="/my">MY</Link>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
