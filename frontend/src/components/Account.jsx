import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Web3 from "web3";
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";

const Account = () => {
  const { account, web3, preEventContract } = useOutletContext();

  const [getBalance, setGetBalance] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isSelect, setIsSelect] = useState("A");

  const [testTo, setTestTo] = useState("");
  const [tokenIdTo, setTokenIdTo] = useState();
  const [testAmount, setTestAmount] = useState(0);

  const privateKey =
    "0x141f916c68756d7413fd0c65c14e7b6b37f431791433bbb129a5ea88a8ac01ee";

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

      const nonce = await web3.eth.getTransactionCount(account, "latest");
      const gasPrice = await web3.eth.getGasPrice();
      console.log(gasPrice);

      const tokenId = Number(tokenIdTo);

      const tx = {
        from: account,
        to: PRE_EVENT_CONTRACT,
        nonce: nonce,
        gas: 93572n,
        // gasPrice: gasPrice,
        data: preEventContract.methods
          .transferFrom(account, testTo, tokenId)
          .encodeABI(),
        // value: "0x0",
        maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"),
        maxFeePerGas: web3.utils.toWei("10", "gwei"),
        type: "0x2",
      };

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
    <div>
      <div className="">
        <button onClick={() => setShowInfo(true)}>Show Wallet</button>
        {showInfo && (
          <ul>
            <li>Address : {account}</li>
            <li>Balance : {getBalance}</li>
          </ul>
        )}
        <ul className="flex gap-2">
          <button onClick={() => setIsSelect("A")} className="btn-style">
            send ETH
          </button>
          <button onClick={() => setIsSelect("B")} className="btn-style">
            send NFT
          </button>
        </ul>
      </div>
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
          <input
            className="self-center ml-2 font-semibold py-6 btn-style "
            type="submit"
            value="send"
          />
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
          <input
            className="self-center ml-2 font-semibold py-6 btn-style "
            type="submit"
            value="send"
          />
        </form>
      )}
    </div>
  );
};

export default Account;
