import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import { useState } from "react";
import postEventAbi from "../abis/PostEventAbi.json";

const ToCollection = ({
  collectionAddress,
  tokenId,
  account,
  web3,
  adminKey,
  isEntered,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClickPostMint = async () => {
    try {
      if (!account) return;

      setIsLoading(true);

      const adminAccount = web3.eth.accounts.privateKeyToAccount(adminKey);

      // collection에 민팅할 CA
      const postEventContract = new web3.eth.Contract(
        postEventAbi,
        collectionAddress
    );

      const tx = {
        from: adminAccount.address,
        to: collectionAddress,
        gas: 300000n,
        // gasPrice: gasPrice,
        data: postEventContract.methods
          .mintTicket(account, tokenId)
          .encodeABI(),
        // value: "0x0",
        maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"),
        maxFeePerGas: web3.utils.toWei("120", "gwei"),
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

      const signedTx = await web3.eth.accounts.signTransaction(tx, adminKey);

      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log("tx receipt:", receipt);

      setIsLoading(false);
      alert("Collection에서 티켓을 확인해주세요");

    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <ul className="flex justify-center items-center flex-col">
          <li>
            <ImSpinner8 className="animate-spin h-4 w-4" />
          </li>
          <li className="mt-1 text-xs">컬렉션으로 이동</li>
        </ul>
      ) : (
        <button
          key={tokenId}
          className={
            isEntered
              ? "flex items-center justify-end text-sm border-2 border-b-[5px] border-r-[5px] border-black focus:bg-[#038BD5]  focus:text-white py-1 px-[6px] rounded-md text-md font-semibold duration-150 "
              : "flex items-center justify-end text-sm border-2 border-b-[5px] border-r-[5px]  focus:bg-[#038BD5]  py-1 px-[6px] rounded-md text-md font-semibold duration-150 cursor-not-allowed border-[#919191] text-[#919191]"
          }
          onClick={onClickPostMint}
        >
          컬렉션 보관
        </button>
      )}
    </>
  );
};

export default ToCollection;