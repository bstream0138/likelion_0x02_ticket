import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import MyTicketCard from "../components/MyTicketCard";
import CollectionCard from "../components/CollectionCard";

// 메뉴바의 Ticket 페이지
const Ticket = () => {
  const { account } = useOutletContext();
  const navigate = useNavigate();

  const [isSelect, setIsSelect] = useState("A");

  //로그인 안됬을시 로그인 페이지로
  useEffect(() => {
    if (!account) {
      alert("You need to login");
      navigate("/login");
    }
  }, [account]);

  return (
    <div className="min-h-screen min-w-screen md:[450px] mx-auto poppins overflow-y-auto">
      <ul className="grid grid-cols-2 justify-items-center py-3 mt-4">
        <button
          className={
            isSelect === "A"
              ? " bg-[#0073DC] text-white flex items-center justify-end border-2 mt-[2px] border-black py-1 px-[24px] rounded-full duration-100 whitespace-pre-wrap"
              : "flex items-center hover:bg-[#0073DC] hover:text-white  justify-end border-2 border-b-[5px] border-black  py-1 px-[24px] rounded-full duration-100 whitespace-pre-wrap"
          }
          onClick={() => setIsSelect("A")}
        >
          {`티    켓`}
        </button>
        <button
          onClick={() => setIsSelect("B")}
          className={
            isSelect === "B"
              ? "whitespace-pre-wrap sig-yellow text-white flex items-center justify-end border-2 mt-[2px] border-black py-1 px-[16px] rounded-full duration-100"
              : "whitespace-pre-wrap flex items-center hover:bg-[#FBAE16] hover:text-white  justify-end border-2 border-b-[5px] border-black  py-1  px-[16px] rounded-full duration-100"
          }
        >
          {`선  물  함`}
        </button>
      </ul>
      {isSelect === "A" && <MyTicketCard />}
      {isSelect === "B" && <CollectionCard />}
    </div>
  );
};

export default Ticket;
// className={
//   hoverTicket
//     ? "flex items-center justify-end border-2 mt-[2px] border-black py-1 px-[10px] rounded-full "
//     : "flex items-center justify-end border-2 border-b-[5px] border-black  py-1 px-[10px] rounded-full"
// }
