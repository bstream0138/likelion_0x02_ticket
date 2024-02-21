import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Purchased = () => {
  const { preEventContract, account } = useOutletContext();

  const isRefunded = async () => {
    const tokenId = await preEventContract.methods.balanceOf(account).call();

    await preEventContract.methods.isCanceled(tokenId).call();
  };

  return (
    <ul className="flex flex-col gap-2  mb-2 border-t-2 border-black py-[2px]">
      <ul className="flex items-center justify-between mt-4">
        <li className="w-60 text-left ml-12 truncate">Concert Info</li>
        <li className=" mr-[38px]">Date</li>
        <li className=" mr-[60px]">Time</li>
      </ul>
    </ul>

  );
};

export default Purchased;

//구매시 구매목록에 출력
//민팅했을시에 환불불가.
//
