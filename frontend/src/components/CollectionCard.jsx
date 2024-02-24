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
  //모달
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
  //고객이 가진 NFT티켓 불러오기
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
    <div className="min-w-screen min-h-screen mx-auto md:w-[450px] h-[90vh]">
      <div className="w-[370px] flex items-center mx-auto justify-center text-center text-3xl mt-2 py-2 border-b-2 border-b-black">
        Collection
      </div>
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
          <div key={i} className="header poppins">
            <button
              className="w-[380px] h-[200px] border-2 border-black mx-auto overflow-hidden flex "
              onClick={isModalOpen}
            >
              <div className="bg-white w-[145px] h-full">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-[145px] object-cover "
                />
              </div>
              <div className="w-[255px] bg-white hover:bg-[#b3b3b3] duration-150 hover:text-white h-[200px]">
                <ul className="mt-10 mr-3">
                  티켓 번호 : {v.tokenId}
                  <div className="mt-5 ml-2 px-5">
                    <ul className="text-md font-extrabold flex items-center gap-1  mt-[2px] justify-center mr-1 ">
                      <span className="mr-[-2px]">
                        <CiMicrophoneOn />
                      </span>
                      <span className="mr-[10px] mt-[3px] ">IU</span>
                    </ul>
                    <ul className="text-xs mt-[10px] mb-[1px] ml-[0.5px] flex items-center gap-1">
                      <span>{v.description}</span>
                    </ul>
                  </div>
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

export default CollectionCard;
