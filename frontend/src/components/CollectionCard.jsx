import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Refund from "./Refund";
import { CiCalendar, CiLocationOn, CiMicrophoneOn } from "react-icons/ci";
import { ImSpinner8 } from "react-icons/im";
import Web3 from "web3";
import PostEventAbi from "../abis/PostEventAbi.json";
import { POST_EVENT_CONTRACT } from "../abis/contractAddress";

//Ticket 페이지에서의 MyTicketCard 화면
//내가 민팅한 NFT표 보관

const CollectionCard = () => {
  const [isModal, setIsModal] = useState(false);
  const { account } = useOutletContext();
  const [metadataArray, setMetadataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  // const [purchasedList, setPurchasedList] = useState([]);

  const _web3 = new Web3(window.ethereum);
  const postEventContract = new _web3.eth.Contract(
    PostEventAbi,
    POST_EVENT_CONTRACT
  );

  const isModalOpen = () => {
    setIsModal(!isModal);
  };

  // const getPurchased = async () => {
  //   const customerID = localStorage.getItem("customerID");
  //   if (!customerID) return;

  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/purchase_list?customerID=${customerID}`
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setPurchasedList(data);
  //       console.log("getPurchased: ", data);
  //     } else {
  //       throw new Error("Failed to fetch purchase list");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getMyNft = async () => {
    try {
      if (!postEventContract) return;

      // 내가 가진 티켓 개수
      const balance = await postEventContract.methods.balanceOf(account).call();

      let temp = [];
      if (balance > 0) {
        setIsLoading(true);
        setIsEmpty(false);
        for (let i = 0; i < Number(balance); i++) {
          const tokenId = await postEventContract.methods
            .tokenOfOwnerByIndex(account, i)
            .call();

          const metadataURI = await postEventContract.methods
            .tokenURI(Number(tokenId))
            .call();

          const response = await axios.get(metadataURI);
          // const purchase = purchasedList.find((p) => p.ID === tokenId);

          temp.push({ ...response.data, tokenId: Number(tokenId) });
          console.log(response.data);
        }
        setMetadataArray(temp);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (purchasedList) return;
  //   getPurchased();
  // }, [purchasedList]);

  useEffect(() => {
    if (!postEventContract) return;

    getMyNft();
  }, []);

  return (
    <div className="w-[425px] h-[90vh]">
      <div className="w-[425px] text-center text-3xl mt-2">Collection</div>
      <div className="flex flex-col gap-3 pt-10">
        {isLoading && (
          <div className="flex items-center justify-start text-3xl flex-col mt-20">
            <ul>
              <ImSpinner8 className="animate-spin w-16 h-16" />
            </ul>
            <ul className="mt-2">Loading...</ul>
          </div>
        )}
        {isEmpty && (
          <div>
            <div className="flex items-center justify-center text-3xl mt-4">
              발급 된 티켓이 없습니다
            </div>
            <div className=" whitespace-pre-wrap text-sm font-normal flex justify-center mt-2">
              {`티켓 구매후 민팅을 진행해주세요 티켓구매가 완료된 상태이시면
                     구매내역을 확인후 민팅해주세요`}
            </div>
          </div>
        )}
        {metadataArray.map((v, i) => (
          <div key={i} className="header">
            <div className="w-[384px] h-[202px] ml-[24px] mt-[4px] fixed bg-black top-0 left-0 -z-30 content"></div>

            <button
              className="w-[380px] h-[200px] border-2 border-black mx-auto overflow-hidden flex "
              onClick={isModalOpen}
            >
              <img src={v.image} alt={v.name} className="w-[145px]" />
              <div className="w-[255px] bg-white h-[200px]">
                <ul className="mt-8 mr-3">
                  티켓 번호 : {v.tokenId}
                  <div className="mt-12 ml-2 px-5">
                    <ul className="text-md font-extrabold flex items-center gap-1  mt-[2px]  ">
                      <span className="mr-[-2px]">
                        <CiMicrophoneOn />
                      </span>
                      <span className="mr-[10px]">IU</span>
                    </ul>
                    <ul className="text-sm mt-[2px] mb-[1px] ml-[0.5px] flex items-center gap-1">
                      <span>
                        <CiLocationOn />
                      </span>
                      <span className="text-xs ">잠실종합운동장</span>
                    </ul>
                    <ul className="text-sm flex items-center font-light gap-1">
                      <span className="ml-[1px]">
                        <CiCalendar />
                      </span>
                      <span className="text-xs mt-[1px]">
                        2024.02.29 - 2024.03.02
                      </span>
                    </ul>
                  </div>
                </ul>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionCard;
