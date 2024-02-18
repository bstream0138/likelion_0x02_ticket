const Purchased = () => {
  return (
    <li className="flex items-center justify-between">
      <li className="w-60 text-left ml-2 truncate">NFT </li>
      <button className="btn-style ml-5">Mint</button>
      <button className="btn-style ml">Refund</button>
    </li>
  );
};

export default Purchased;

//구매시 구매목록에 출력
//민팅했을시에 환불불가.
//
