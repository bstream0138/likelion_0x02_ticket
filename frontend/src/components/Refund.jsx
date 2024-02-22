import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";
import { ImSpinner8 } from "react-icons/im";

const Refund = ({ tokenId }) => {
  const { preEventContract, account } = useOutletContext();
  const [refundModal, setRefundModal] = useState(false);
  const [hoverRefund, setHoverRefund] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setRefundModal(!refundModal);
  };

  // 주석 친것들 가스비 대신 지불을 위한 함수들
  // const privateKey = process.env.REACT_APP_PRIVATE_KEY;

  // const mintAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
  // // console.log(mintAccount);

  const onClickRefund = async () => {
    try {
      setIsLoading(true);

      await preEventContract.methods.cancel(tokenId).send({ from: account });

      // const tx = {
      //   from: mintAccount.address,
      //   to: PRE_EVENT_CONTRACT,
      //   gas: 150254n,
      //   // gasPrice: gasPrice,
      //   data: preEventContract.methods.cancel(tokenId).encodeABI(),
      //   // value: "0x0",
      //   maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"),
      //   maxFeePerGas: web3.utils.toWei("120", "gwei"),
      //   type: "0x02",
      // };

      // console.log("tx:", tx);

      // web3.eth
      //   .estimateGas(tx)
      //   .then((gasAmount) => {
      //     console.log("Estiamte Gas:", gasAmount);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });

      // const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

      // const receipt = await web3.eth.sendSignedTransaction(
      //   signedTx.rawTransaction
      // );
      // console.log("tx receipt:", receipt);

      await preEventContract.methods.isCanceled(tokenId).call();

      alert("환불이 완료되었습니다.");
      setIsLoading(false);
      setRefundModal(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="border-2 border-black rounded-md px-2 text-2xl hover:bg-[#AB161E] duration-100 py-2 hover:text-white flex items-center justify-center"
        onClick={openModal}
      >
        환불하기
      </button>
      {refundModal && (
        <div className="bg-black bg-opacity-40 w-full h-full fixed left-0 top-0 ">
          <div className="flex-col gap-2 w-[300px] h-[300px]  bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 fixed border-2 border-black flex items-center justify-center z-50">
            <button className="fixed top-0 right-2" onClick={openModal}>
              x
            </button>
            <ul>환불을 진행하시겠습니까 ?</ul>
            <button
              className={
                hoverRefund
                  ? "flex items-center mt-[12px] ml-[3px] justify-end border-2 border-black py-1 px-[6px] rounded-md text-2xl "
                  : "flex items-center mt-[9px] justify-end border-2 border-b-[5px] border-r-[5px] border-black  py-1 px-[6px] rounded-md text-2xl "
              }
              onMouseEnter={() => setHoverRefund(true)}
              onMouseLeave={() => setHoverRefund(false)}
              onClick={onClickRefund}
            >
              Refund
            </button>
            <div className="w-[300px] h-[10px]">
              {isLoading && (
                <ul className="flex w-[300px] items-center flex-col justify-center mt-4">
                  <li>
                    <ImSpinner8 className="animate-spin w-10 h-10" />
                  </li>
                  <li className="mt-2">환불을 진행중입니다.</li>
                </ul>
              )}
            </div>
          </div>
          <div className="bg-black w-[305px] ml-2 h-[305px] mt-2 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-40"></div>
        </div>
      )}
    </div>
  );
};

export default Refund;

//MyTicketCard의 tokenId와 purchasedModal의 Purchas.ID를 어떻게 매칭시켜야하나
