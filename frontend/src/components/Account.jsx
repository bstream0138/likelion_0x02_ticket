import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { ImSpinner8 } from "react-icons/im";

import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";

const Account = ({ setIsModal }) => {
  const { account, web3, preEventContract } = useOutletContext();

  const [getBalance, setGetBalance] = useState(0);
  const [isSelect, setIsSelect] = useState("A");
  const [accountTo, setaccountTo] = useState("");
  const [tokenIdTo, setTokenIdTo] = useState();
  const [testAmount, setTestAmount] = useState(0);
  const [hoverNftSend, setHoverNftSend] = useState(false);
  const [hoverEthSend, setHoverEthSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //유저가 생성한 비공개키 넣기
  //Send ETH 와 Send NFT 를 위해 서명에 필요한 개인키 정보
  const privateKey = "";

  //고객의 이더 내보내기 함수.
  const sendEth = async (e) => {
    e.preventDefault();
    if (!accountTo || !testAmount) return;

    setIsLoading(true);

    const amountToWei = web3.utils.toWei(testAmount.toString(), "ether");
    const gasPrice = await web3.eth.getGasPrice();

    const tx = {
      from: account,
      to: accountTo,
      value: amountToWei,
      gas: 300000n,
      gasPrice: gasPrice,
    };

    try {
      // const receipt = await web3.eth.sendTransaction({
      //   from: account,
      //   to: accountTo,
      //   value: amountToWei,
      //   gas: estimatedGas,
      // });

      // console.log(`Transaction successful : ${receipt}`);

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

      const txReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      console.log("영수증 :", txReceipt);
      setIsLoading(false);

      setTestAmount(0);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  //NFT 내보내기 함수.
  const transferNFT = async (e) => {
    try {
      e.preventDefault();
      if (!account || !accountTo || tokenIdTo === undefined) return;
      setIsLoading(true);

      // const nonce = await web3.eth.getTransactionCount(account, "latest");

      const tokenId = Number(tokenIdTo);

      const tx = {
        from: account,
        to: PRE_EVENT_CONTRACT,
        gas: 300000n,
        // gasPrice: gasPrice,
        data: preEventContract.methods
          .transferFrom(account, accountTo, tokenId)
          .encodeABI(),
        // value: "0x0",
        maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"),
        maxFeePerGas: web3.utils.toWei("30", "gwei"),
        type: "0x2",
      };
      //0.00023271

      web3.eth
        .estimateGas(tx)
        .then((gasAmount) => {
          console.log("Estiamte Gas:", gasAmount);
        })
        .catch((error) => {
          console.error(error);
        });

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

      const txReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      console.log("영수증 :", txReceipt);
      setIsLoading(false);
      setTokenIdTo("");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!account) return;

    //나의 어카운트로 지정한 어카운트의 잔액정보 불러오기
    const myBalance = async () => {
      try {
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEther = web3.utils.fromWei(balanceWei, "ether");
        setGetBalance(balanceEther);
      } catch (error) {
        console.error(error);
      }
    };

    myBalance();
  }, [account, web3]);

  return (
    <>
      <div className="w-[350px] h-[350px] z-20  bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 fixed border-2 border-black ">
        <button className="fixed right-2" onClick={() => setIsModal(false)}>
          x
        </button>
        <div className="mt-6 px-4">
          <ul>
            <li className="truncate">Address : {account}</li>
            <li>Balance : {getBalance}</li>
          </ul>
          <ul className="flex gap-2 mt-4">
            <button
              onClick={() => setIsSelect("A")}
              className={
                isSelect === "A"
                  ? " bg-[#a8a8a8] rounded-md px-1 border-2 border-black"
                  : "px-1 border-2 border-black rounded-md"
              }
            >
              send ETH
            </button>
            <button
              onClick={() => setIsSelect("B")}
              className={
                isSelect === "B"
                  ? "  bg-[#a8a8a8] rounded-md px-1 border-2 border-black"
                  : "px-1 border-2 border-black rounded-md"
              }
            >
              send NFT
            </button>
          </ul>

          {isSelect === "A" && (
            <form className="flex mt-2" onSubmit={(e) => sendEth(e)}>
              <ul className="flex flex-col gap-2 ">
                <input
                  className="input-style"
                  value={accountTo}
                  onChange={(e) => setaccountTo(e.target.value)}
                  type="text"
                  placeholder="Address"
                />
                <input
                  className="input-style"
                  value={testAmount}
                  onChange={(e) => setTestAmount(e.target.value)}
                  type="number"
                  placeholder="Amount"
                />
              </ul>
              <button
                className={
                  hoverEthSend
                    ? "flex items-center mt-[3px] ml-[3px] justify-end border-2 border-black py-1 px-[6px] rounded-md text-2xl "
                    : "flex items-center justify-end border-2 border-b-[5px] border-r-[5px] border-black  py-1 px-[6px] rounded-md text-2xl "
                }
                onMouseEnter={() => setHoverEthSend(true)}
                onMouseLeave={() => setHoverEthSend(false)}
              >
                send
              </button>
            </form>
          )}
          {isSelect === "B" && (
            <form className="flex mt-2" onSubmit={(e) => transferNFT(e)}>
              <ul className="flex flex-col gap-2 ">
                <input
                  className="input-style"
                  value={accountTo}
                  onChange={(e) => setaccountTo(e.target.value)}
                  type="text"
                  placeholder="Address"
                />
                <input
                  className="input-style"
                  value={tokenIdTo}
                  onChange={(e) => setTokenIdTo(e.target.value)}
                  type="number"
                  placeholder="TokenID"
                />
              </ul>
              <button
                className={
                  hoverNftSend
                    ? "flex items-center mt-[3px] ml-[3px] justify-end border-2 border-black py-1 px-[6px] rounded-md text-2xl "
                    : "flex items-center justify-end border-2 border-b-[5px] border-r-[5px] border-black  py-1 px-[6px] rounded-md text-2xl "
                }
                onMouseEnter={() => setHoverNftSend(true)}
                onMouseLeave={() => setHoverNftSend(false)}
              >
                send
              </button>
            </form>
          )}
          {isLoading && (
            <ul className="flex justify-center mt-10 items-center flex-col">
              <li>
                <ImSpinner8 className="animate-spin h-10 w-10" />
              </li>
              <li className="mt-2">잠시만 기다려주세요</li>
            </ul>
          )}
        </div>
      </div>
      <div className=" bg-black w-[355px] ml-2 h-[355px] mt-2 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"></div>
    </>
  );
};

export default Account;
