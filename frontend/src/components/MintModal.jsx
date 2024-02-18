import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";

//구매 PaymentPage 에서 구매 버튼 눌렀을때 민팅기능

const MintModal = ({ toggleOpen }) => {
  const { account, preEventContract, web3 } = useOutletContext();
  const [metadataArray, setMetadataArray] = useState([]);
  // const [metadata, setMetadata] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hoverMint, setHoverMint] = useState(false);
  const [hoverLater, setHoverLater] = useState(false);

  const privateKey = process.env.REACT_APP_PRIVATE_KEY;

  const mintAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
  // console.log(mintAccount);

  const onClickMint = async () => {
    try {
      if (!preEventContract || !account || !mintAccount) return;

      setIsLoading(true);

      // const gasPrice = await web3.eth.getGasPrice();
      const balance = await preEventContract.methods
        .balanceOf(mintAccount.address)
        .call();
      // const tokenId = Number(balance);
      // const nonce = await web3.eth.getTransactionCount(account, "latest");

      const tx = {
        from: mintAccount.address,
        to: PRE_EVENT_CONTRACT,
        gas: 150254n,
        // gasPrice: gasPrice,
        data: preEventContract.methods.mintTicket(account).encodeABI(),
        // value: "0x0",
        maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"),
        maxFeePerGas: web3.utils.toWei("30", "gwei"),
        type: "0x02",
      };

      console.log("tx:", tx);

      web3.eth
        .estimateGas(tx)
        .then((gasAmount) => {
          console.log("Estiamte Gas:", gasAmount);
        })
        .catch((error) => {
          console.error(error);
        });

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log("tx receipt:", receipt);

      const tokenId = await preEventContract.methods
        .tokenOfOwnerByIndex(mintAccount.address, Number(balance) - 1)
        .call();

      // // 민팅하기;
      // await preEventContract.methods
      //   .mintTicket(account)
      //   .send({ from: mintAccount.address });

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
      <div className="w-[300px] h-[300px] bg-black top-[182px] left-[57px] fixed"></div>
      <div className="w-[300px] h-[300px] bg-white fixed top-1/4 left-1/2 -translate-x-1/2 border-2 border-black ">
        <button className="fixed right-2" onClick={toggleOpen}>
          x
        </button>
        <ul className="flex items-center justify-center h-full gap-4 flex-col">
          <div className="text-center whitespace-pre-wrap">{`구매후 민팅을 진행하시겠습니까?
티켓 민팅 후 환불이 불가능합니다
`}</div>
          <div className="text-xs text-center">
            민팅은 MY메뉴의 구매내역에서도 가능합니다
          </div>
          <div className="flex gap-4">
            <button
              className={
                hoverMint
                  ? "flex items-center  justify-end border-2 mt-[2px] border-black py-1 px-[10px] rounded-full"
                  : "flex items-center   justify-end border-2 border-b-[5px] border-black  py-1 px-[10px] rounded-full"
              }
              onClick={onClickMint}
              onMouseEnter={() => setHoverMint(true)}
              onMouseLeave={() => setHoverMint(false)}
            >
              민팅하기
            </button>
            <button
              className={
                hoverLater
                  ? "flex items-center  justify-end border-2 mt-[2px] border-black py-1 px-[10px] rounded-full"
                  : "flex items-center   justify-end border-2 border-b-[5px] border-black  py-1 px-[10px] rounded-full"
              }
              onClick={toggleOpen}
              onMouseEnter={() => setHoverLater(true)}
              onMouseLeave={() => setHoverLater(false)}
            >
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
