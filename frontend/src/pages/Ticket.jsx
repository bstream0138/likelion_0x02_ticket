import { useEffect, useState } from "react";
import MyTicketCard from "../components/MyTicketCard";
import CollectionCard from "../components/CollectionCard";
import { useNavigate, useOutletContext } from "react-router-dom";

const Ticket = () => {
  const { account } = useOutletContext();
  const navigate = useNavigate();

  const [isSelect, setIsSelect] = useState("A");
  const [hoverTicket, setHoverTicket] = useState(false);
  const [hoverCollection, setHoverCollection] = useState(false);

  // useEffect(() => {
  //   if (!preEventContract) {
  //     // console.log("contract :", preEventContract);
  //     return;
  //   }
  // }, [preEventContract]);

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
              ? " bg-[#0073DC] text-white flex items-center justify-end border-2 mt-[2px] border-black py-1 px-[10px] rounded-full duration-100"
              : "flex items-center hover:bg-[#0073DC] hover:text-white  justify-end border-2 border-b-[5px] border-black  py-1 px-[10px] rounded-full duration-100"
          }
          onClick={() => setIsSelect("A")}
        >
          My Ticket
        </button>
        <button
          onClick={() => setIsSelect("B")}
          className={
            isSelect === "B"
              ? " bg-[#0073DC] text-white flex items-center justify-end border-2 mt-[2px] border-black py-1 px-[10px] rounded-full duration-100"
              : "flex items-center hover:bg-[#0073DC] hover:text-white  justify-end border-2 border-b-[5px] border-black  py-1 px-[10px] rounded-full duration-100"
          }
        >
          Collection
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
