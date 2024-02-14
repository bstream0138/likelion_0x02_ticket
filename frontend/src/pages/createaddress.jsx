import { useState } from "react";
import Web3 from "web3";

// TEST 지갑주소 만들기
const CreateAddress = ({ userInfo }) => {
  const [generatedAccount, setGeneratedAccount] = useState(null);

  const timeStamp = new Date().getTime().toString();
  console.log(timeStamp);

  const addressGenerate = async () => {
    const web3 = new Web3("http://127.0.0.1:7545");

    console.log(web3.currentProvider);

    const privateKey = web3.utils.sha3(timeStamp + userInfo.userID);
    //keccak 256으로 UID와 generate한 시간으로 생성
    console.log(privateKey);

    const addressFromPrivateKey =
      web3.eth.accounts.privateKeyToAccount(privateKey);
    console.log("web3.eth.accounts: ", web3.eth.accounts);
    console.log("addressFromPrivateKey: ", addressFromPrivateKey);
    setGeneratedAccount(addressFromPrivateKey);
  };

  return (
    <div>
      <button onClick={() => addressGenerate(userInfo.userID)}>Generate</button>
      {generatedAccount && (
        <div>
          <p>address : {generatedAccount.address}</p>
          <p>privateKey : {generatedAccount.privateKey}</p>
        </div>
      )}
    </div>
  );
};

export default CreateAddress;