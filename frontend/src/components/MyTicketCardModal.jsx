import { useState } from "react";

const MyTicketCardModal = ({ isModalOpen }) => {
  const [hoverToCollection, setHoverToCollection] = useState(false);
  const [hoverToEnter, setHoverToEnter] = useState(false);

  return (
    <>
      <div className="w-[300px] h-[300px] fixed  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-black bg-white ">
        <button className="fixed top-0 right-2" onClick={isModalOpen}>
          x
        </button>
        <div className="flex items-center justify-center h-full gap-2">
          <button
            className={
              hoverToCollection
                ? "flex items-center mt-[3px] ml-[3px] justify-end border-2 border-black py-1 px-[6px] rounded-md text-md font-semibold "
                : "flex items-center justify-end border-2 border-b-[5px] border-r-[5px] border-black  py-1 px-[6px] rounded-md text-md font-semibold"
            }
            onMouseEnter={() => setHoverToCollection(true)}
            onMouseLeave={() => setHoverToCollection(false)}
          >
            컬렉션에 보관
          </button>
          <button
            className={
              hoverToEnter
                ? "flex items-center mt-[3px] ml-[3px] justify-end border-2 border-black py-1 px-[6px] rounded-md text-md font-semibold "
                : "flex items-center justify-end border-2 border-b-[5px] border-r-[5px] border-black  py-1 px-[6px] rounded-md text-md font-semibold"
            }
            onMouseEnter={() => setHoverToEnter(true)}
            onMouseLeave={() => setHoverToEnter(false)}
          >
            공연 입장
          </button>
        </div>
      </div>
      <div className="bg-black w-[305px] ml-2 h-[305px] mt-2 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -z-10"></div>
    </>
  );
};

export default MyTicketCardModal;
