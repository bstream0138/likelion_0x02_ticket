import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import Web3 from "web3";
import {
  POST_EVENT_CONTRACT,
  PRE_EVENT_CONTRACT,
} from "../abis/contractAddress";
import postEventAbi from "../abis/PostEventAbi.json";
import preEventAbi from "../abis/PreEventAbi.json";
import PreTicket from "./PreTicket";


//Ticket 페이지에서의 MyTicketCard 화면
//내가 민팅한 NFT표 보관

const MyTicketCard = () => {
  const { concert } = useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metadataArray, setMetadataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [concertData, setConcertData] = useState([]);
  const [isEntered, setIsEntered] = useState(false);
  const [myNFTArray, setMyNFTArray] = useState([]);


  const adminKey = process.env.REACT_APP_PRIVATE_KEY;
  const web3 = new Web3(window.ethereum);
  const account = localStorage.getItem("account");

  const getMyNft = async () => {
    let totalNFT = 0;
    setIsLoading(true);
    console.log('MyTicketCard.jsx/getMyNft:',concert);
    for(let j=0; j < concert.length; j++ ){
      const ticketAddress = concert[j].TICKET_ADDR;
      const collectionAddress = concert[j].TICKET_ADDR;

      const preEventContract = new web3.eth.Contract(
          preEventAbi,
          ticketAddress
      );

      if (!preEventContract) continue;

      // 내가 가진 티켓 개수
      const balance = await preEventContract.methods.balanceOf(account).call();
      
      let temp = [];
      if (Number(balance) > 0) {
        totalNFT += Number(balance);
        console.log('totalNFT:', totalNFT);

        for (let i = 0; i < Number(balance); i++) {
          const tokenId = await preEventContract.methods
            .tokenOfOwnerByIndex(account, i)
            .call();

          const isCanceled = await preEventContract.methods
            .isCanceled(tokenId)
            .call();

          const checkEnter = await preEventContract.methods
            .isEntered(tokenId)
            .call();

          setIsEntered(checkEnter);
          console.log(checkEnter);

          if (!isCanceled) {
            const metadataURI = await preEventContract.methods
              .tokenURI(Number(tokenId))
              .call();

            const response = await axios.get(metadataURI);
            // const purchase = purchasedList.find((p) => p.ID === tokenId);
            console.log('MyTicketCard/getMyNft/response: ', response);

            temp.push({
              ...response.data,
              tokenId: Number(tokenId),
              isEntered: checkEnter,
              ticketAddress: ticketAddress,
              collectionAddress: collectionAddress,
            });
          }
        }

        setMetadataArray([...temp]);
        console.log(metadataArray);
        
      }
    //end of for
    }
    setIsLoading(false);
    if( totalNFT === 0 ) setIsEmpty(true);
  };

  useEffect(() => {
    getMyNft();
  }, []);


  return (
    <div className="min-w-screen min-h-screen md:[450px] h-[90vh]">
      <div className=" flex items-center mx-auto justify-center text-center text-3xl mt-2 py-2 border-b-2 w-[370px] border-b-black"></div>
      <div className="flex flex-col gap-3 pt-10">
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
        {metadataArray.map((v, i) => {
          return (
            <PreTicket
              key={i}
              tokenId={v.tokenId}
              name={v.name}
              image={v.image}
              isEntered={v.isEntered}
              ticketAddress={v.ticketAddress}
              collectionAddress={v.collectionAddress}
              account={account}
              web3={web3}
              adminKey={adminKey}
            />
          );
        })}
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

export default MyTicketCard;
