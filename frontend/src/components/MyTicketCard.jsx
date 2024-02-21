import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import NftModal from "./NftModal";
import Refund from "./Refund";
import { CiCalendar, CiLocationOn, CiMicrophoneOn } from "react-icons/ci";

//Ticket 페이지에서의 MyTicketCard 화면
//내가 민팅한 NFT표 보관

const MyTicketCard = () => {
  const [isModal, setIsModal] = useState(false);
  const isModalOpen = () => {
    setIsModal(!isModal);
  };
  const { account, preEventContract } = useOutletContext();
  const [metadataArray, setMetadataArray] = useState([]);

  const getMyNft = async () => {
    try {
      if (!preEventContract) return;

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
        }
      }
      setMetadataArray(temp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!preEventContract) return;

    getMyNft();
  }, [preEventContract]);

  return (
    <div className="w-[425px] h-[90vh] overflow-y-scroll">
      <h1 className="px-2 py-2">MY TICKET</h1>
      <div className="grid grid-cols-1 gap-3 pt-10  mx-auto ">
        {metadataArray.map((v, i) => (
          <div key={i} className="header">
            <div className="w-[404px] h-[205px] ml-[13px] fixed bg-black top-0 left-0 content -z-30 rounded-md content"></div>

            <button
              className="w-[400px] h-[200px] border-2 border-black mx-auto overflow-hidden flex "
              onClick={isModalOpen}
            >
              {metadataArray ? (
                <img src={v.image} alt={v.name} className="w-[145px]" />
              ) : (
                <div className="flex w-[145px] h-[205px] items-center justify-center text-sm ">
                  Loading...
                </div>
              )}
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
