import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDown = () => setIsOpen(!isOpen);

  return (
    <div className="w-[425px] bg-blue-300 mx-auto sticky top-0 h-[50px] z-10 ">
      <ul className="flex bg-red-200  items-center h-full gap-6 justify-between px-4">
        <ul>
          <Link to="/home">HOME</Link>
        </ul>
        <ul>
          <input className="border px-2" placeholder="search" type />
        </ul>
        <ul className="flex gap-1 header">
          <button onClick={toggleDown}>MY</button>
        </ul>
        {isOpen && (
          <ul className="fixed bg-yellow-100 right-1/2 translate-x-[213px] top-10 flex flex-col content ">
            <Link to="/myprofile" onClick={() => setIsOpen(false)}>
              Profile
            </Link>
            <Link to="/myticket" onClick={() => setIsOpen(false)}>
              MY Ticket
            </Link>
            <Link to="/collection" onClick={() => setIsOpen(false)}>
              Collection
            </Link>
            <Link to="/wishlist" onClick={() => setIsOpen(false)}>
              Wishlist
            </Link>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Header;