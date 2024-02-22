import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";

const Account = ({ setIsModal }) => {
  const { account, web3, preEventContract } = useOutletContext();

  const [getBalance, setGetBalance] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isSelect, setIsSelect] = useState("A");
  const [testTo, setTestTo] = useState("");
  const [tokenIdTo, setTokenIdTo] = useState();
  const [testAmount, setTestAmount] = useState(0);
  const [hoverNftSend, setHoverNftSend] = useState(false);
  const [hoverEthSend, setHoverEthSend] = useState(false);

  const privateKey =
    "0x2c38ba44c25f06c1acf4dd1a5b9d24f5e768312552f247565a0c9c18dc05a04f";
  //유저가 생성한 비공개키 넣기
  // 1. 0x141f916c68756d7413fd0c65c14e7b6b37f431791433bbb129a5ea88a8ac01ee;
  // 2. 0x2c38ba44c25f06c1acf4dd1a5b9d24f5e768312552f247565a0c9c18dc05a04f;

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

  //잔액 send 테스트
  const sendEth = async (e) => {
    e.preventDefault();
    if (!testTo || !testAmount) return;

    const amountToWei = web3.utils.toWei(testAmount.toString(), "ether");
    const estimatedGas = await web3.eth.estimateGas({
      from: account,
      to: testTo,
      value: amountToWei,
    });

    const tx = {
      from: account,
      to: testTo,
      value: amountToWei,
      gas: estimatedGas,
    };

    try {
      const receipt = await web3.eth.sendTransaction({
        from: account,
        to: testTo,
        value: amountToWei,
        gas: estimatedGas,
      });

      console.log(`Transaction successful : ${receipt}`);
      await updateBalance();

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

      const txReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      console.log("영수증 :", txReceipt);
    } catch (error) {
      console.error(error);
    }
  };

  //잔액정보를 새로 불러와서 sendEth에서 써야 오류 안일어남
  const updateBalance = async () => {
    if (!account) return;

    try {
      const balanceWei = await web3.eth.getBalance(account);
      const balanceEther = web3.utils.fromWei(balanceWei, "ether");
      setGetBalance(balanceEther);
    } catch (error) {
      console.error(error);
    }
  };

  const transferNFT = async (e) => {
    try {
      e.preventDefault();
      if (!account || !testTo || tokenIdTo === undefined) return;

      // const nonce = await web3.eth.getTransactionCount(account, "latest");
      const gasPrice = await web3.eth.getGasPrice();
      // console.log(gasPrice);

      const tokenId = Number(tokenIdTo);

      const tx = {
        from: account,
        to: PRE_EVENT_CONTRACT,
        gas: 300000n,
        // gasPrice: gasPrice,
        data: preEventContract.methods
          .transferFrom(account, testTo, tokenId)
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-[400px] h-[400px]  bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 fixed border-2 border-black ">
        <button className="fixed right-2" onClick={() => setIsModal(false)}>
          x
        </button>
        <div className="mt-6 px-4">
          <ul>
            <li>Address : {account}</li>
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
                  value={testTo}
                  onChange={(e) => setTestTo(e.target.value)}
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
                  value={testTo}
                  onChange={(e) => setTestTo(e.target.value)}
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
        </div>
      </div>
      <div className="bg-black w-[405px] ml-2 h-[405px] mt-2 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -z-40"></div>
    </>
  );
};

export default Account;
