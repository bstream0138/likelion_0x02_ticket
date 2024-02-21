import { useEffect, useState } from "react";
import MyTicketCard from "../components/MyTicketCard";
import CollectionCard from "../components/CollectionCard";
import { useNavigate, useOutletContext } from "react-router-dom";

const Ticket = () => {
  const { account, setAccount, preEventContract } = useOutletContext();
  const navigate = useNavigate();

  const [isSelect, setIsSelect] = useState("A");
  const [hoverTicket, setHoverTicket] = useState(false);
  const [hoverCollection, setHoverCollection] = useState(false);

  useEffect(() => {
    if (!preEventContract) {
      console.log("contract :", preEventContract);
      return;
    }
  }, [preEventContract]);

  useEffect(() => {
    if (!account) {
      alert("You need to login");
      navigate("/login");
    }
  }, [account]);

  return (
    <div className="w-[447px] h-[80vh] mx-auto poppins  overflow-y-auto">
      <ul className="grid grid-cols-2 justify-items-center py-3 mt-4">
        <button
          className={
            hoverTicket
              ? "flex items-center justify-end border-2 mt-[2px] border-black py-1 px-[10px] rounded-full "
              : "flex items-center justify-end border-2 border-b-[5px] border-black  py-1 px-[10px] rounded-full"
          }
          onClick={() => setIsSelect("A")}
          onMouseEnter={() => setHoverTicket(true)}
          onMouseLeave={() => setHoverTicket(false)}
        >
          My Ticket
        </button>
        <button
          onClick={() => setIsSelect("B")}
          onMouseEnter={() => setHoverCollection(true)}
          onMouseLeave={() => setHoverCollection(false)}
          className={
            hoverCollection
              ? "flex items-center  justify-end border-2 mt-[2px] border-black py-1 px-[10px] rounded-full"
              : "flex items-center   justify-end border-2 border-b-[5px] border-black  py-1 px-[10px] rounded-full"
          }
        >
          (Collection)
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
