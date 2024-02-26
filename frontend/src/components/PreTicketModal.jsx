import React from "react";
import EnterConcert from "./EnterConcert";
import ToCollection from "./ToCollection";

const PreTicketModal = ({
  tokenId,
  postEventContract,
  mintAccount,
  account,
  web3,
  privateKey,
  setIsModalOpen,
  setMetadataArray,
  metadataArray,
  getMyNft,
  isEntered,
  preEventContract,
}) => {
  return (
    <ul className="mt-4 gap-1  flex items-center justify-center ">
      <li>
        <EnterConcert
          key={tokenId}
          tokenId={tokenId}
          preEventContract={preEventContract}
          mintAccount={mintAccount}
          account={account}
          privateKey={privateKey}
          web3={web3}
          isEntered={isEntered}
        />
      </li>
      <li>
        <ToCollection
          key={tokenId}
          tokenId={tokenId}
          postEventContract={postEventContract}
          mintAccount={mintAccount}
          account={account}
          web3={web3}
          privateKey={privateKey}
          setIsModalOpen={setIsModalOpen}
          setMetadataArray={setMetadataArray}
          metadataArray={metadataArray}
          getMyNft={getMyNft}
          isEntered={isEntered}
        />
      </li>
    </ul>
  );
};

export default PreTicketModal;
