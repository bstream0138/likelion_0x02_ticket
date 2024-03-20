import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

import axios from "axios";
import Web3 from "web3";
import PostEventAbi from "../abis/PostEventAbi.json";

import { CiMicrophoneOn } from "react-icons/ci";
import { ImSpinner8 } from "react-icons/im";

//Ticket 페이지에서의 선물함 화면 // 종료된 모든 공연의 티켓 보관
const CollectionCard = () => {
  const [isModal, setIsModal] = useState(false);
  const { account, concert } = useOutletContext();
  const [metadataArray, setMetadataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const web3 = new Web3(process.env.REACT_APP_INFURA_SEPOLIA);

  const isModalOpen = () => {
    setIsModal(!isModal);
  };

  //공연입장후 선물함으로 이동(postEventContract로 민팅)하여 보관된 고객 지갑주소의 NFT 티켓을 불러오는 함수
  const getMyNft = async () => {
    let totalNFT = 0;
    setIsLoading(true);
    let temp = [];
    for (let j = 0; j < concert.length; j++) {
      const collectionAddress = concert[j].COLLECTION_ADDR;

      const postEventContract = new web3.eth.Contract(
        PostEventAbi,
        collectionAddress
      );

      if (!postEventContract) continue;

      const balance = await postEventContract.methods.balanceOf(account).call();

      if (Number(balance) > 0) {
        totalNFT += Number(balance);
        console.log("totalNFT:", totalNFT);

        for (let i = 0; i < Number(balance); i++) {
          const tokenId = await postEventContract.methods
            .tokenOfOwnerByIndex(account, i)
            .call();

          const metadataURI = await postEventContract.methods
            .tokenURI(Number(tokenId))
            .call();

          const response = await axios.get(metadataURI);
          // const purchase = purchasedList.find((p) => p.ID === tokenId);
          console.log("CollectionCard/getMyNft/response: ", response);

          temp.push({
            ...response.data,
            tokenId: Number(tokenId),
            collectionAddress: collectionAddress,
          });
        }
      }
    }
    //end of for

    setMetadataArray(temp);
    setIsLoading(false);
    if (totalNFT === 0) setIsEmpty(true);
  };

  //위의 NFT카드 불러오기함수 렌더링
  useEffect(() => {
    getMyNft();
  }, []);

  return (
    <div className="min-w-screen min-h-screen mx-auto md:w-[450px] h-[90vh]">
      <div className="w-[370px] flex items-center mx-auto justify-center text-center text-3xl mt-2 py-2 border-b-2 border-b-black"></div>
      <div className="flex flex-col gap-3 pt-10">
        {isEmpty && (
          <div>
            <div className="flex items-center justify-center text-3xl mt-4">
              보관중인 선물이 없습니다
            </div>
            <div className=" whitespace-pre-wrap text-sm font-normal flex justify-center mt-2">
              {`공연이 끝난 티켓을 선물로 교환하세요`}
            </div>
          </div>
        )}
        {metadataArray.map((v, i) => (
          <div key={i} className="header poppins">
            <button
              className="w-[380px] h-[197px] border-2 border-black mx-auto overflow-hidden flex "
              onClick={isModalOpen}
            >
              <div className="bg-white w-[145px] h-full">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-[145px] object-cover "
                />
              </div>
              {v.tokenId % 6 === 0 ? (
                <div className="w-[255px] bg-gradient-to-t  from-[#ad5ce3] via-[#ec38bc] to-[#fdeff9] duration-150 hover:text-white h-[200px]">
                  <ul className="mt-10 mr-3">
                    선물 번호 : {v.tokenId}
                    <div className="mt-5 ml-2 px-5">
                      <ul className="text-md font-extrabold flex items-center gap-1  mt-[2px] justify-center mr-1 ">
                        <span className="mr-[-2px]">
                          <CiMicrophoneOn />
                        </span>
                        <span className="mr-[10px] mt-[3px] ">{v.name}</span>
                      </ul>
                      <ul className="text-xs mt-[10px] mb-[1px] ml-[0.5px] flex items-center gap-1">
                        <span>{v.description}</span>
                      </ul>
                    </div>
                  </ul>
                </div>
              ) : v.tokenId % 6 === 3 || v.tokenId % 6 === 5 ? (
                <div className="w-[255px] bg-gradient-to-t from-white  to-blue-200  duration-150 hover:text-white h-[200px]">
                  <ul className="mt-10 mr-3">
                    선물 번호 : {v.tokenId}
                    <div className="mt-5 ml-2 px-5">
                      <ul className="text-md font-extrabold flex items-center gap-1  mt-[2px] justify-center mr-1 ">
                        <span className="mr-[-2px]">
                          <CiMicrophoneOn />
                        </span>
                        <span className="mr-[10px] mt-[3px] ">{v.name}</span>
                      </ul>
                      <ul className="text-xs mt-[10px] mb-[1px] ml-[0.5px] flex items-center gap-1">
                        <span>{v.description}</span>
                      </ul>
                    </div>
                  </ul>
                </div>
              ) : (
                <div className="w-[255px] bg-white  duration-150 hover:bg-[#a1a1a1] h-[200px]">
                  <ul className="mt-10 mr-3">
                    선물 번호 : {v.tokenId}
                    <div className="mt-5 ml-2 px-5">
                      <ul className="text-md font-extrabold flex items-center gap-1  mt-[2px] justify-center mr-1 ">
                        <span className="mr-[-2px]">
                          <CiMicrophoneOn />
                        </span>
                        <span className="mr-[10px] mt-[3px] ">{v.name}</span>
                      </ul>
                      <ul className="text-xs mt-[10px] mb-[1px] ml-[0.5px] flex items-center gap-1">
                        <span>{v.description}</span>
                      </ul>
                    </div>
                  </ul>
                </div>
              )}
            </button>
            <div className=" mt-[4px] ml-[4px] bg-black left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 content -z-30 w-[380px] h-[199px]"></div>
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="flex items-center justify-start text-3xl flex-col mt-20">
          <ul>
            <ImSpinner8 className="animate-spin w-16 h-16" />
          </ul>
          <ul className="mt-2">Loading...</ul>
        </div>
      )}
    </div>
  );
};

export default CollectionCard;
