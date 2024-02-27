import React from "react";
import EnterConcert from "./EnterConcert";
import ToCollection from "./ToCollection";

const PreTicketModal = ({
  tokenId,
  ticketAddress,
  collectionAddress,
  account,
  web3,
  adminKey,
  isEntered,
}) => {
  return (
    <ul className="mt-4 gap-1  flex items-center justify-center ">
      <li>
        <EnterConcert
          key={tokenId}
          ticketAddress={ticketAddress}
          tokenId={tokenId}
          account={account}
          adminKey={adminKey}
          web3={web3}
          isEntered={isEntered}
        />
      </li>
      <li>
        <ToCollection
          key={tokenId}
          collectionAddress={collectionAddress}
          ticketAddress={ticketAddress}
          tokenId={tokenId}
          account={account}
          web3={web3}
          adminKey={adminKey}
          isEntered={isEntered}
        />
      </li>
    </ul>
  );
};

export default PreTicketModal;
