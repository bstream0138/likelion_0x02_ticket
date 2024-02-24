import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import Account from "../components/Account";
import Purchased from "../components/Purchased";
import PurchasedModal from "../components/PurchasedModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const My = () => {
  const { account, setAccount, preEventContract } = useOutletContext();
  const navigate = useNavigate();
  const [hoverLogout, setHoverLogout] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isModalPurchased, setIsModalPurchased] = useState(false);

  const [purchasedList, setPurchasedList] = useState([]);

  //Purchased 리스트 작성예정
  const getPurchased = async () => {
    const customerID = localStorage.getItem("customerID");
    if (!customerID) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/purchase_list?customerID=${customerID}`
      );
      if (response.ok) {
        const data = await response.json();
        setPurchasedList(data);
        console.log("getPurchased: ", data);
      } else {
        throw new Error("Failed to fetch purchase list");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPurchased();
  }, []);

  const onClickModal = () => {
    setIsModal(!isModal);
  };
  const onClickModalPurchased = () => {
    setIsModalPurchased(!isModalPurchased);
  };

  //로그아웃
  const handleLogout = () => {
    //localStorage에서 item 삭제
    localStorage.clear();
    setAccount("");
    navigate("/");
  };

  //로그인 안되있을시 로그인페이지로
  useEffect(() => {
    if (!account) {
      alert("You need to login");
      navigate("/login");
    }
  }, [account]);

  return (
    <div className="min-h-screen min-w-screen mx-auto px-2 poppins overflow-y-auto">
      <ToastContainer toastStyle={{ backgroundColor: "crimson" }} />
      <div className="px-4 mt-4">
        <ul className="flex justify-between items-center">
          <button
            className={
              hoverLogout
                ? "border-2 mt-[13px] border-black py-1 px-[10px] rounded-full text-2xl ml-2"
                : "border-2 mt-[10px] border-b-[5px] border-black  py-1 px-[10px] rounded-full text-2xl ml-2"
            }
            onClick={handleLogout}
            onMouseEnter={() => setHoverLogout(true)}
            onMouseLeave={() => setHoverLogout(false)}
          >
            Logout
          </button>
          <button
            onClick={onClickModal}
            className="mt-[18px] mr-2 text-xl hover:underline hover:text-[#034ECC] duration-100"
          >
            Show Wallet&Send
          </button>
        </ul>
        <div>
          {isModal && (
            <ul className="bg-black bg-opacity-40 w-full h-full fixed left-0 top-0  ">
              <li className="">
                <Account setIsModal={setIsModal} />
              </li>
            </ul>
          )}
          <div className="mt-4 text-2xl font-semibold text-white py-1 pl-1 rounded-t-md bg-[#034ECC]">
            Purchased
          </div>
          <ul className="flex flex-col gap-2 py-[2px]">
            <Purchased />
          </ul>
          <ul className="flex flex-col gap-2 border-t-2 border-black py-[2px]">
            {purchasedList.map((purchase) => {
              return (
                <>
                  <button
                    key={purchase.ID}
                    className="flex py-2 hover:bg-[#919191] hover:text-white duration-100 "
                    onClick={onClickModalPurchased}
                  >
                    <span className="truncate w-1/3 ml-8">
                      {purchase.CONTENT}
                    </span>
                    <span className="w-2/3">{purchase.PURCHASE_DATE}</span>
                  </button>
                  {isModalPurchased && (
                    <PurchasedModal
                      setIsModalPurchased={setIsModalPurchased}
                      isModalPurchased={isModalPurchased}
                      key={Purchased.ID}
                      purchasedID={purchase.ID}
                      purchasedMinted={purchase.IS_MINTED}
                      purchasedRefunded={purchase.IS_REFUNDED}
                    />
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default My;
