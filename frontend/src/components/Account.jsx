import { useEffect, useState } from "react";
import Web3 from "web3";

const Account = () => {
  const [getBalance, setGetBalance] = useState(0);
  const [testTo, setTestTo] = useState("");
  const [testAmount, setTestAmount] = useState(0);
  const [firstAddress, setFirstAddress] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const web3 = new Web3("http://127.0.0.1:7545");

  useEffect(() => {
    if (!web3) return;
    const loadAddress = async () => {
      try {
        const addresses = await web3.eth.getAccounts();
        if (addresses.length > 0) {
          setFirstAddress(addresses[0]);
        }
      } catch (error) {
        console.error("failed to connect to Ganache");
      }
    };
    loadAddress();
  }, [web3, firstAddress]);
  //가나슈의 첫번째 어카운트를 나의 어카운트로 지정

  useEffect(() => {
    const myAddress = async () => {
      // const ganacheAccountAddress = "0xF88EEC385c18B08938df52E5aB37a6601d9372F2"; 테스트후 사용
      if (firstAddress) {
        const balanceWei = await web3.eth.getBalance(firstAddress);
        const balanceEther = web3.utils.fromWei(balanceWei, "ether");
        setGetBalance(balanceEther);
      }
    };
    myAddress();
  }, [firstAddress]);
  //나의 어카운트로 지정한 어카운트의 잔액정보 불러오기

  const sendEth = async (e) => {
    e.preventDefault();
    if (!testTo || !testAmount) return;
    const amountToWei = web3.utils.toWei(testAmount.toString(), "ether");

    try {
      const receipt = await web3.eth.sendTransaction({
        from: firstAddress,
        to: testTo,
        value: amountToWei,
      });

      console.log(`Transaction successful : ${receipt}`);
      await updateBalance();
    } catch (error) {
      console.error(error);
    }
  };
  //잔액 send 테스트

  const updateBalance = async () => {
    if (!firstAddress) return;
    try {
      const balanceWei = await web3.eth.getBalance(firstAddress);
      const balanceEther = web3.utils.fromWei(balanceWei, "ether");
      setGetBalance(balanceEther);
    } catch (error) {
      console.error("failed to connect to Ganache");
    }
  };
  //잔액정보를 새로 불러와서 sendEth에서 써야 오류 안일어남

  return (
    <div>
      {" "}
      <button onClick={() => setShowInfo(true)}>Show Wallet</button>
      {showInfo && (
        <ul>
          <li>Address : {firstAddress}</li>
          <li>Balance : {getBalance}</li>
        </ul>
      )}
      <form className="flex" onSubmit={(e) => sendEth(e)}>
        <ul className="flex flex-col gap-2 ">
          <input
            className="input-style"
            onChange={(e) => setTestTo(e.target.value)}
            type="text"
            placeholder="Address"
          />
          <input
            className="input-style"
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
    </div>
  );
};

export default Account;
