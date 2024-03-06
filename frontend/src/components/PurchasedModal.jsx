import PurchasedMintModal from "./PurchasedMintModal";
import Refund from "./Refund";

//마이 페이지에서의 구매내역 클릭시 모달 환불과 민팅 버튼
const PurchasedModal = ({
  onClcikCloseModalPurchased,
  purchasedID,
  purchasedMinted,
  purchasedRefunded,
  purchasedDate,
  purchasedContent,
  purchasedTicketAddress,
}) => {
  return (
    <div className="bg-black bg-opacity-10 w-full h-full fixed left-0 top-0 z-10 ">
      <div className="flex-col gap-2 w-[320px] h-[320px]  bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 fixed border-2 border-black flex items-center justify-center z-30">
        <ul className="flex flex-col w-[250px] h-full justify-end ">
          <ul className="text-center flex-col border-b-2 flex border-black gap-2 justify-center items-center mt-10 h-full">
            <li className="text-xl font-bold">{purchasedContent}</li>
            <li className="pt-6 ">{purchasedDate}</li>
          </ul>
          <li className="">
            <PurchasedMintModal
              purchasedID={purchasedID}
              purchasedMinted={purchasedMinted}
              purchasedRefunded={purchasedRefunded}
              purchasedTicketAddress={purchasedTicketAddress}
            />
            <Refund
              purchasedID={purchasedID}
              purchasedMinted={purchasedMinted}
              purchasedRefunded={purchasedRefunded}
            />
          </li>
        </ul>
        <button
          className="hover:underline duration-150 mt-4"
          onClick={onClcikCloseModalPurchased}
        >
          뒤로가기
        </button>
        <div className="w-[300px] h-[10px]"></div>
      </div>
      <div className="bg-black w-[325px] ml-2 h-[325px] mt-2 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"></div>
    </div>
  );
};

export default PurchasedModal;

// purchaseID={purchase.ID}
// isMinted={purchase.IS_MINTED}
// isRefunded={purchase.IS_REFUNDED}
