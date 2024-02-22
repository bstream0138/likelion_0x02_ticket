import PurchasedMintModal from "./PurchasedMintModal";
import Refund from "./Refund";

const PurchasedModal = ({
  setIsModalPurchased,
  isModalPurchased,
  purchasedList,
}) => {

  const _purchasedList = purchasedList;
  console.log('purchasedList: ', _purchasedList);

  return (
    <div className="bg-black bg-opacity-40 w-full h-full fixed left-0 top-0 ">
      <div className="flex-col gap-2 w-[400px] h-[400px]  bg-white left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 fixed border-2 border-black flex items-center justify-center z-30">
        <button
          className="fixed top-0 right-2"
          onClick={() => {
            setIsModalPurchased(!isModalPurchased);
          }}
        >
          x
        </button>
        <ul className="flex gap-4">
          {purchasedList.map((purchase) => (
            <>
              <PurchasedMintModal key={purchase.ID} purchaseID={purchase.ID} isMinted={purchase.IS_MINTED} isRefunded={purchase.IS_REFUNDED}/>
              <Refund key={purchase.ID} purchaseID={purchase.ID} isMinted={purchase.IS_MINTED} isRefunded={purchase.IS_REFUNDED}/>
            </>
            
          ))}
        </ul>
        <div className="w-[300px] h-[10px]"></div>
      </div>
      <div className="bg-black w-[405px] ml-2 h-[405px] mt-2 fixed left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 z-10"></div>
    </div>
  );
};

export default PurchasedModal;
