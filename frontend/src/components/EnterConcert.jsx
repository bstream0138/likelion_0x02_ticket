import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";
import { ImSpinner8 } from "react-icons/im";

const EnterConcert = ({
  tokenId,
  preEventContract,
  mintAccount,
  account,
  web3,
  privateKey,
  isLoading,
  setIsLoading,
}) => {
  const onClickEnter = async () => {
    try {
      if (!preEventContract) return;

      setIsLoading(true);

      const balance = await preEventContract.methods.balanceOf(account).call();
      // const tokenId = Number(balance);
      // const nonce = await web3.eth.getTransactionCount(account, "latest");

      const tokenId = await preEventContract.methods
        .tokenOfOwnerByIndex(account, Number(balance) - 1)
        .call();

      const tx = {
        from: mintAccount.address,
        to: PRE_EVENT_CONTRACT,
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

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log("tx receipt:", receipt);
      setIsLoading(false);
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
            <ImSpinner8 className="animate-spin h-6 w-6" />
          </li>
          <li className="mt-1 text-sm">공연 입장 중</li>
        </ul>
      ) : (
        <button
          key={tokenId}
          className={
            "flex items-center justify-end border-2 border-b-[5px] border-r-[5px] border-black focus:bg-[#038BD5]  focus:text-white py-1 px-[6px] rounded-md text-md font-semibold duration-150 "
          }
          onClick={onClickEnter}
        >
          컬렉션 보관
        </button>
      )}
    </>
  );
};

export default EnterConcert;
