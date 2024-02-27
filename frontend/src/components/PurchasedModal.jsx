import { useEffect } from "react";
import PurchasedMintModal from "./PurchasedMintModal";
import Refund from "./Refund";

//마이 페이지에서의 모달 환불과 민팅 버튼
const PurchasedModal = ({
  setIsModalPurchased,
  isModalPurchased,
  purchasedID,
  purchasedMinted,
  purchasedRefunded,
}) => {
  return (
    <div className="bg-black bg-opacity-10 w-full h-full fixed left-0 top-0 z-10 ">
      <div className="flex-col gap-2 w-[320px] h-[320px]  bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 fixed border-2 border-black flex items-center justify-center z-30">
        <button
          className="fixed top-0 right-2"
          onClick={() => {
            setIsModalPurchased(!isModalPurchased);
          }}
        >
          x
        </button>
        <ul className="flex gap-4">
          <>
            <PurchasedMintModal
              purchasedID={purchasedID}
              purchasedMinted={purchasedMinted}
              purchasedRefunded={purchasedRefunded}
            />
            <Refund
              purchasedID={purchasedID}
              purchasedMinted={purchasedMinted}
              purchasedRefunded={purchasedRefunded}
            />
          </>
        </ul>
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
