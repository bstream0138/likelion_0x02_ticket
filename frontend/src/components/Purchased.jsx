import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Purchased = () => {
  // const { preEventContract, account } = useOutletContext();

  // const isRefunded = async () => {
  //   const tokenId = await preEventContract.methods.balanceOf(account).call();

  //   await preEventContract.methods.isCanceled(tokenId).call();
  // };
  //purchase 상단 메뉴바
  return (
    <ul className="flex flex-col gap-2 mb-2 border-t-2 border-black py-[2px]">
      <ul className="flex items-center justify-between mt-4">
        <li className="ml-12">Concert Info</li>
        <li className="mr-28">Time</li>
      </ul>
    </ul>
  );
};

export default Purchased;

//구매시 구매목록에 출력
//민팅했을시에 환불불가.
//
