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
        <ul className="flex bg-[#FBAE16] items-center h-full  gap-6 justify-between px-4">
          <ul className="">
            <Link to="/">HOME</Link>
          </ul>
          <ul className="">
            <Link to="/ticket">TICKET</Link>
          </ul>
          <ul>
            <li>(searching)</li>
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
