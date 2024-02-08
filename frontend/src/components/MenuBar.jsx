import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <div className="w-[425px] bg-blue-300 mx-auto bottom-0 sticky h-[50px] z-10 ">
      <ul className="flex bg-red-200  items-center h-full gap-6 justify-between px-4">
        <ul className="">
          <Link to="/home">HOME</Link>
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
  );
};

export default MenuBar;
