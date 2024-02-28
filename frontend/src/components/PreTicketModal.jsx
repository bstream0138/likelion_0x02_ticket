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
  getMyNft,
}) => {
  return (
    <ul className="mt-4 gap-1  flex items-center justify-center -z-10  ">
      {isEntered ? (
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
            getMyNft={getMyNft}
          />
        </li>
      ) : (
        <li>
          <EnterConcert
            key={tokenId}
            ticketAddress={ticketAddress}
            tokenId={tokenId}
            account={account}
            adminKey={adminKey}
            web3={web3}
            isEntered={isEntered}
            getMyNft={getMyNft}
          />
        </li>
      )}
    </ul>
  );
};

export default PreTicketModal;
