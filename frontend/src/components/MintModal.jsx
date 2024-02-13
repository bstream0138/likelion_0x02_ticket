import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

//구매 PaymentPage 에서 구매 버튼 눌렀을때 민팅기능

const MintModal = ({ toggleOpen }) => {
  const { account, preEventContract } = useOutletContext();
  const [metadataArray, setMetadataArray] = useState([]);
  const [metadata, setMetadata] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onClickMint = async () => {
    try {
      if (!preEventContract || !account) return;

      setIsLoading(true);

      //민팅하기
      // await preEventContract.methods.mintNFT().send({ from: account });

      //@ts-expect-error
      const balance = await preEventContract.methods.balanceOf(account).call();

      const tokenId = await preEventContract.methods
        //@ts-expect-error
        .tokenOfOwnerByIndex(account, Number(balance) - 1)
        .call();

      const metadataURI = await preEventContract.methods
        //@ts-expect-error
        .tokenURI(tokenId)
        .call();

      const response = await axios.get(metadataURI);

      setMetadata(response.data);
      setMetadataArray([response.data, ...metadataArray]);
      setIsLoading(false);

      alert("Minting Success");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-opacity-40 bg-black w-full h-full top-0 left-0 fixed z-20">
      <div className="w-[300px] h-[300px] bg-white fixed top-1/4 left-1/2 -translate-x-1/2 rounded-md ">
        <ul className="flex items-center justify-center h-full gap-4 flex-col">
          <div className="flex gap-4">
            <button className="btn-style" onClick={onClickMint}>
              민팅하기
            </button>
            <button className="btn-style" onClick={toggleOpen}>
              나중에
            </button>
          </div>
          {isLoading && <div className="mt-4">잠시만 기다려 주세요.</div>}
        </ul>
      </div>
    </div>
  );
};

export default MintModal;
