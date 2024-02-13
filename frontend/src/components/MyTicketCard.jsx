import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import NftModal from "./NftModal";

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

      const searchTokenId = await preEventContract.methods
        .balanceOf(account)
        .call();

      let temp = [];

      for (let i = 0; i < Number(searchTokenId); i++) {
        const tokenId = i + 1;
        const metadataURI = await preEventContract.methods
          .tokenURI(tokenId)
          .call();

        const response = await axios.get(metadataURI);

        temp.push({ ...response.data, tokenId: tokenId });
        console.log(response.data);
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
    <div className="w-[425px] min-h-screen bg-blue-200">
      <h1 className="px-2 py-2">MY TICKET</h1>
      <div className="grid grid-cols-1 gap-3 pt-10 rounded-md mx-auto ">
        {metadataArray.map((v, i) => (
          <button
            key={i}
            className="w-[400px] h-[200px] bg-green-100 rounded-md mx-auto "
            onClick={isModalOpen}
          >
            <img src={v.image} alt={v.name} />
          </button>
        ))}
      </div>
      {isModal && <NftModal isModalOpen={isModalOpen} />}
    </div>
  );
};

export default MyTicketCard;
