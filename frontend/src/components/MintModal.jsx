import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

//구매 PaymentPage 에서 구매 버튼 눌렀을때 민팅기능

const MintModal = ({ toggleOpen }) => {
  const { account, preEventContract, web3 } = useOutletContext();
  const [metadataArray, setMetadataArray] = useState([]);
  // const [metadata, setMetadata] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  console.log(privateKey);

  const mintAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
  // console.log(mintAccount);

  const onClickMint = async () => {
    try {
      if (!preEventContract || !account) return;

      setIsLoading(true);

      const balance = await preEventContract.methods.balanceOf(account).call();
      const newTokenId = Number(balance);

      const tx = {
        from: mintAccount.address,
        to: preEventContract.address,
        gasLimit: 3000000,
        gasPrice: 300000,
        data: preEventContract.methods
          .mintTicket(account, newTokenId)
          .encodeABI(),
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log("tx receipt:", receipt);

      const tokenId = await preEventContract.methods
        .tokenOfOwnerByIndex(account, Number(balance) - 1)
        .call();

      //민팅하기
      // await preEventContract.methods
      //   .mintTicket(signPromise, tokenId)
      //   .send({ from: account });

      const metadataURI = await preEventContract.methods
        .tokenURI(tokenId)
        .call();

      const response = await axios.get(metadataURI);

      // setMetadata(response.data);
      setMetadataArray([response.data, ...metadataArray]);
      setIsLoading(false);
      console.log("metadata:", response.data);
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
