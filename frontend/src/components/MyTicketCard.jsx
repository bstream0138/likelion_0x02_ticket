import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Refund from "./Refund";
import { CiCalendar, CiLocationOn, CiMicrophoneOn } from "react-icons/ci";
import { ImSpinner8 } from "react-icons/im";

//Ticket 페이지에서의 MyTicketCard 화면
//내가 민팅한 NFT표 보관

const MyTicketCard = () => {
  const [isModal, setIsModal] = useState(false);
  const isModalOpen = () => {
    setIsModal(!isModal);
  };
  const { account, preEventContract } = useOutletContext();
  const [metadataArray, setMetadataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyNft = async () => {
    try {
      if (!preEventContract) return;
      setIsLoading(true);
      // 내가 가진 티켓 개수
      const balance = await preEventContract.methods.balanceOf(account).call();

      let temp = [];

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

          temp.push({ ...response.data, tokenId: Number(tokenId) });
          console.log(response.data);
          setIsLoading(false);
        }
      }
      setMetadataArray(temp);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!preEventContract) return;

    getMyNft();
  }, [preEventContract]);

  return (
    <div className="w-[425px] h-[90vh] ">
      <div className="w-[425px] text-center text-3xl mt-2">MY TICKET</div>
      <div className="flex flex-col gap-3 pt-10">
        {isLoading ? (
          <div>
            <div className="flex items-center justify-center text-3xl mt-4">
              발급 된 티켓이 없습니다
            </div>
            <div className=" whitespace-pre-wrap text-sm font-normal flex justify-center mt-2">
              {`티켓 구매후 민팅을 진행해주세요 티켓구매가 완료된 상태이시면
                      구매내역을 확인후 민팅해주세요`}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-start text-3xl flex-col mt-20">
            <ul>
              <ImSpinner8 className="animate-spin w-16 h-16" />
            </ul>
            <ul className="mt-2">Loading...</ul>
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
                <ul className="mt-5">
                  TokenID : {v.tokenId}
                  <div className="mt-5 px-5">
                    <ul className="text-sm font-semibold flex items-center gap-1 ">
                      <CiMicrophoneOn />
                      IU
                    </ul>
                    <ul className="text-sm mt-[2px] flex items-center gap-1">
                      <CiLocationOn />
                      장소
                    </ul>
                    <ul className="text-sm flex items-center gap-1">
                      <CiCalendar />
                      2024.02.29 ~ 2024.03.02
                    </ul>
                    <Refund tokenId={v.tokenId} getMyNft={getMyNft} />
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

export default MyTicketCard;
