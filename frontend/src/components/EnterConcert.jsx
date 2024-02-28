import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import preEventAbi from "../abis/PreEventAbi.json";

import Web3 from "web3";

const EnterConcert = ({
  ticketAddress,
  tokenId,
  account,
  adminKey,
  web3,
  getMyNft,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onClickEnter = async () => {
    try {
      setIsLoading(true);

      const adminAccount = web3.eth.accounts.privateKeyToAccount(adminKey);
      console.log(adminKey);

      // NFT Ticket Address
      const preEventContract = new web3.eth.Contract(
        preEventAbi,
        ticketAddress
      );

      const tx = {
        from: adminAccount.address,
        to: ticketAddress,
        gas: 300000n,
        data: preEventContract.methods.enter(tokenId).encodeABI(),
        maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"),
        maxFeePerGas: web3.utils.toWei("120", "gwei"),
        type: "0x02",
      };

      // await preEventContract.methods.enter(Number(tokenId)).call();

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
      getMyNft();
      alert("행복한 하루 되세요!");
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
          <li className="mt-1 text-xs">공연 입장</li>
        </ul>
      ) : (
        <button
          key={tokenId}
          className={
            "flex items-center justify-end text-sm border-2 border-b-[5px] border-r-[5px] border-black focus:bg-[#038BD5]  focus:text-white py-1 px-[6px] rounded-md text-md font-semibold duration-150 sig-blue hover:bg-[#0215AB] "
          }
          onClick={() => onClickEnter(tokenId)}
        >
          공연 입장
        </button>
      )}
    </>
  );
};

export default EnterConcert;
