import { useState } from "react";

const TicketCard = () => {
  const [isModal, setIsModal] = useState(false);
  const isModalOpen = () => {
    setIsModal(!isModal);
  };

  //모달 구현 tokenURI있을때 맵돌려서 구현예정
  return (
    <div className="w-[425px] min-h-screen bg-blue-200 mx-auto">
      <h1 className="px-2 py-2">MY TICKET</h1>
      <div className="pl-1 bg-red-100 grid grid-cols-2 gap-3 pt-10 ">
        <button
          className="w-[200px] h-[250px] bg-green-100 "
          onClick={isModalOpen}
        >
          picture
        </button>
        <ul className="w-[200px] h-[250px] bg-green-100">picture</ul>
        <ul className="w-[200px] h-[250px] bg-green-100">picture</ul>
        <ul className="w-[200px] h-[250px] bg-green-100">picture</ul>
      </div>
      {isModal && (
        <div
          className="bg-opacity-40 bg-black w-full h-full top-0 left-0 fixed z-20"
          onClick={isModalOpen}
        >
          <div
            className="w-[400px] h-[200px] bg-blue-100 fixed top-1/2 -translate-y-[200px] left-1/2 -translate-x-1/2 rounded-md"
            onClick={isModalOpen}
          ></div>
        </div>
      )}
    </div>
  );
};

export default TicketCard;
