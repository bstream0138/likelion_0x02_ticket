import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Web3 from "web3";

const Account = () => {
  const { loginMethod, account, setAccount, userInfo, web3 } = useOutletContext();
  
  const [getBalance, setGetBalance] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const [testTo, setTestTo] = useState("");
  const [testAmount, setTestAmount] = useState(0);

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

    try {
      const receipt = await web3.eth.sendTransaction({
        from: account,
        to: testTo,
        value: amountToWei,
      });

      console.log(`Transaction successful : ${receipt}`);
      await updateBalance();
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
  

  return (
    <div>
      {" "}
      <button onClick={() => setShowInfo(true)}>Show Wallet</button>
      {showInfo && (
        <ul>
          <li>Address : {account}</li>
          <li>Balance : {getBalance}</li>
        </ul>
      )}
      <form className="flex mt-2" onSubmit={(e) => sendEth(e)}>
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
