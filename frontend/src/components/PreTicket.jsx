import React, { useState } from "react";

import { CiCalendar, CiLocationOn, CiMicrophoneOn } from "react-icons/ci";
import PreTicketModal from "./PreTicketModal";

const PreTicket = ({
  tokenId,
  name,
  image,
  isEntered,
  ticketAddress,
  collectionAddress,
  account,
  web3,
  adminKey,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="header">
      <button
        key={tokenId}
        className="w-[380px] h-[200px] border-2 border-black mx-auto overflow-hidden flex "
      >
        <img src={image} alt={name} className="w-[145px] object-cover" />
        <div className="w-[255px] bg-white  h-[200px]">
          {isModalOpen && (
            <ul className="w-[200px] h-[45px] bg-white fixed bottom-6 left-48  z-20 content">
              <button
                onClick={() => setIsModalOpen(false)}
                className="fixed content right-1 top-0"
              >
                x
              </button>
              <PreTicketModal
                key={tokenId}
                tokenId={tokenId}
                account={account}
                ticketAddress={ticketAddress}
                collectionAddress={collectionAddress}
                web3={web3}
                adminKey={adminKey}
                isEntered={isEntered}
              />
            </ul>
          )}
          <ul className="mt-6 mr-3">
            티켓 번호 : {tokenId}
            <div className="mt-6 ml-5 px-5">
              <ul className="text-md font-extrabold flex items-center gap-1  mt-[2px]  ">
                <span className="mr-[-2px]">
                  <CiMicrophoneOn />
                </span>
                <span className="mr-[10px]">IU</span>
              </ul>
              <ul className="text-sm mt-[2px] mb-[1px] ml-[0.5px] flex items-center gap-1">
                <span>
                  <CiLocationOn />
                </span>
                <span className="text-xs ">잠실종합운동장</span>
              </ul>
              <ul className="text-sm flex items-center font-light gap-1">
                <span className="ml-[1px]">
                  <CiCalendar />
                </span>
                <span className="text-xs mt-[1px]">
                  2024.02.29 - 2024.03.02
                </span>
              </ul>
            </div>
          </ul>
          <button onClick={onClickModalOpen} className="mt-4 hover:underline">
            티켓정보변경
          </button>
        </div>
      </button>
      <div className=" mt-[4px] ml-[4px] bg-black left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 content -z-30 w-[380px] h-[200px]"></div>
    </div>
  );
};

export default PreTicket;
