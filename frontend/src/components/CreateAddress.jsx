import Web3 from "web3";

// 지갑주소 만들기
export function CreateAddress( base1, base2) {
  return new Promise( (resolve, reject) => {
    try {
      const web3 = new Web3();
      //const timeStamp = new Date().getTime().toString();
      //const salt = process.env.REACT_APP_GEN_BASE;
      //const seed = `${base1}${timeStamp}${salt}${base2}`;
      const seed = `${base1}${base2}`;
      const privateKey = web3.utils.sha3(seed);
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      resolve({privateKey: account.privateKey, address:account.address});
    } catch(error){
      reject(error);
    }
  });
};

