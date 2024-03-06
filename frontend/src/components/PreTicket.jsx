import React, { useState } from "react";
import PreTicketModal from "./PreTicketModal";

import { CiCalendar, CiLocationOn, CiMicrophoneOn } from "react-icons/ci";

//Ticket => 티켓의 각각의 티켓 컴포넌트
const PreTicket = ({
  tokenId,
  name,
  image,
  location,
  date,
  isEntered,
  ticketAddress,
  collectionAddress,
  account,
  web3,
  adminKey,
  getMyNft,
}) => {
  return (
    <div className="header">
      <button
        key={tokenId}
        className="w-[380px] h-[200px] border-2 border-black mx-auto overflow-hidden flex "
      >
        <img src={image} alt={name} className="w-[145px] object-cover" />
        <div className="w-[255px] bg-white  h-[200px]">
          <ul className="w-[200px] h-[45px] bg-white fixed bottom-6 right-1/12 ml-2 z-20 content">
            <PreTicketModal
              key={tokenId}
              tokenId={tokenId}
              account={account}
              ticketAddress={ticketAddress}
              collectionAddress={collectionAddress}
              web3={web3}
              adminKey={adminKey}
              isEntered={isEntered}
              getMyNft={getMyNft}
            />
          </ul>
          <ul className="mt-6 mr-3">
            티켓 번호 : {tokenId}
            <div className="mt-6 ml-5 px-5">
              <ul className="text-md font-extrabold flex items-center gap-1 mt-[2px]">
                <span className="mr-[-2px]">
                  <CiMicrophoneOn />
                </span>
                <span className="mr-[10px]">{name}</span>
              </ul>
              <ul className="text-sm mt-[2px] mb-[1px] ml-[0.5px] flex items-center gap-1">
                <span>
                  <CiLocationOn />
                </span>
                <span className="text-xs ">{location}</span>
              </ul>
              <ul className="text-sm flex items-center font-light mt-[2px] gap-1">
                <span className="ml-[1px] mb-[3px]">
                  <CiCalendar />
                </span>
                <span className="text-xs mt-[1px]">{date}</span>
              </ul>
            </div>
          </ul>
        </div>
      </button>
      <div className=" mt-[4px] ml-[4px] bg-black left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 content -z-30 w-[380px] h-[200px]"></div>
    </div>
  );
};

export default PreTicket;
