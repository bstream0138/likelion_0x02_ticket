import { useState } from "react";
import TicketCard from "../components/TicketCard";
import CollectionCard from "../components/CollectionCard";

const Ticket = () => {
  const [isSelect, setIsSelect] = useState("A");

  return (
    <div className="w-[425px] min-h-screen bg-blue-200 mx-auto">
      <div className="bg-yellow-200 flex items-center justify-center py-3">
        TICKET
      </div>
      <ul className="grid grid-cols-2 justify-items-center py-3">
        <button onClick={() => setIsSelect("A")}>My Ticket</button>
        <button onClick={() => setIsSelect("B")}>Collection</button>
      </ul>
      {isSelect === "A" && <TicketCard />}
      {isSelect === "B" && <CollectionCard />}
    </div>
  );
};

export default Ticket;
