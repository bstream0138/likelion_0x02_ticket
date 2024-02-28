import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import { useState } from "react";
import PostEventAbi from "../abis/PostEventAbi.json";
import PreEventAbi from "../abis/PreEventAbi.json";

const ToCollection = ({
  collectionAddress,
  ticketAddress,
  tokenId,
  account,
  web3,
  adminKey,
  getMyNft,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const adminAccount = web3.eth.accounts.privateKeyToAccount(adminKey);

  // collection에 민팅할 CA
  const postEventContract = new web3.eth.Contract(
    PostEventAbi,
    collectionAddress
  );

  const preEventContract = new web3.eth.Contract(PreEventAbi, ticketAddress);

  const onClickPostMint = async () => {
    try {
      if (!account) return;

      setIsLoading(true);

      const tx_post = {
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

      console.log("tx_post:", tx_post);

      web3.eth
        .estimateGas(tx_post)
        .then((gasAmount) => {
          console.log("Estiamte Gas:", gasAmount);
        })
        .catch((error) => {
          console.error(error);
        });

      const signedTx_post = await web3.eth.accounts.signTransaction(
        tx_post,
        adminKey
      );

      const receipt_post = await web3.eth.sendSignedTransaction(
        signedTx_post.rawTransaction
      );
      console.log(receipt_post);

      // const tx_pre = {
      //   from: adminAccount.address,
      //   to: ticketAddress,
      //   gas: 300000n,
      //   // gasPrice: gasPrice,
      //   data: preEventContract.methods.burnTicket(tokenId).encodeABI(),
      //   // value: "0x0",
      //   maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"),
      //   maxFeePerGas: web3.utils.toWei("120", "gwei"),
      //   type: "0x02",
      // };

      // console.log("tx_pre:", tx_pre);

      // web3.eth
      //   .estimateGas(tx_pre)
      //   .then((gasAmount) => {
      //     console.log("Estiamte Gas:", gasAmount);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });

      // const signedTx_pre = await web3.eth.accounts.signTransaction(
      //   tx_pre,
      //   adminKey
      // );

      // const receipt_pre = await web3.eth.sendSignedTransaction(
      //   signedTx_pre.rawTransaction
      // );
      // console.log(receipt_pre);

      setIsLoading(false);
      getMyNft();
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
            "flex items-center justify-end text-sm border-2 border-b-[5px] border-r-[5px] border-black hover:bg-[#F96900]  focus:text-white py-1 px-[6px] rounded-md text-md font-semibold duration-150 sig-yellow "
          }
          onClick={onClickPostMint}
        >
          선물 받기
        </button>
      )}
    </>
  );
};

export default ToCollection;
