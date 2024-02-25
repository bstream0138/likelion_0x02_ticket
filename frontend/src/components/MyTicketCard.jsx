import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Refund from "./Refund";
import { CiCalendar, CiLocationOn, CiMicrophoneOn } from "react-icons/ci";
import { ImSpinner8 } from "react-icons/im";
import MyTicketCardModal from "./MyTicketCardModal";

//Ticket 페이지에서의 MyTicketCard 화면
//내가 민팅한 NFT표 보관

const MyTicketCard = () => {
  const [isModal, setIsModal] = useState(false);
  const { account, preEventContract } = useOutletContext();
  const [metadataArray, setMetadataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [purchasedList, setPurchasedList] = useState([]);

  // const isModalOpen = () => {
  //   setIsModal(!isModal);
  // };

  const getPurchased = async () => {
    const customerID = localStorage.getItem("customerID");
    if (!customerID) return;

    try {
      const response = await fetch(
        `http://localhost:3001/purchase_list?customerID=${customerID}`
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

  const getMyNft = async () => {
    try {
      if (!preEventContract) return;

      // 내가 가진 티켓 개수
      const balance = await preEventContract.methods.balanceOf(account).call();

      let temp = [];
      if (balance > 0) {
        setIsLoading(true);
        setIsEmpty(false);
        for (let i = 0; i < Number(balance); i++) {
          const tokenId = await preEventContract.methods
            .tokenOfOwnerByIndex(account, i)
            .call();
          const isCanceled = await preEventContract.methods
            .isCanceled(tokenId)
            .call();

          if (!isCanceled) {
            const metadataURI = await preEventContract.methods
              .tokenURI(Number(!isCanceled))
              .call();

            const response = await axios.get(metadataURI);
            // const purchase = purchasedList.find((p) => p.ID === tokenId);

            temp.push({ ...response.data, tokenId: Number(tokenId) });
            // console.log(response.data);
          }
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

  useEffect(() => {
    if (purchasedList) return;
    getPurchased();
  }, [purchasedList]);

  useEffect(() => {
    if (!preEventContract) return;

    getMyNft();
  }, [preEventContract]);

  return (
    <div className="min-w-screen min-h-screen md:[450px] h-[90vh]">
      <div className=" flex items-center mx-auto justify-center text-center text-3xl mt-2 py-2 border-b-2 w-[370px] border-b-black"></div>
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
            <button className="w-[380px] h-[200px] border-2 border-black mx-auto overflow-hidden flex ">
              <img
                src={v.image}
                alt={v.name}
                className="w-[145px] object-cover"
              />
              <div className="w-[255px] bg-white  h-[200px]">
                <ul className="mt-6 mr-3">
                  티켓 번호 : {v.tokenId}
                  <div className="mt-6 ml-5 px-5">
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
                <ul className="mt-3 flex items-center justify-center">
                  <button
                    key={v.tokenId}
                    className={
                      "flex items-center justify-end border-2 border-b-[5px] border-r-[5px] border-black focus:bg-[#038BD5]  focus:text-white py-1 px-[6px] rounded-md text-md font-semibold duration-150 "
                    }
                  >
                    공연 입장
                  </button>
                </ul>
              </div>
            </button>
            <div className=" mt-[4px] ml-[4px] bg-black left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 content -z-30 w-[380px] h-[200px]"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTicketCard;
