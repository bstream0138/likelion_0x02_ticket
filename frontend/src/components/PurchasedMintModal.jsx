import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";
import { ImSpinner8 } from "react-icons/im";
import preEventAbi from "../abis/PreEventAbi.json";
import Web3 from "web3";

const PurchasedMintModal = ({
  purchasedID,
  purchasedMinted,
  purchasedRefunded,
}) => {
  const { account } = useOutletContext();
  const [metadataArray, setMetadataArray] = useState([]);
  // const [metadata, setMetadata] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPurchasedModalOpen, setIsPurchasedModalOpen] = useState(false);
  const [hoverMint, setHoverMint] = useState(false);
  const navigate = useNavigate();
  const [hoverToHome, setHoverToHome] = useState(false);
  const [hoverViewTicket, setHoverViewTicket] = useState(false);

  const privateKey = process.env.REACT_APP_PRIVATE_KEY;

  const web3 = new Web3(window.ethereum);

  const preEventContract = new web3.eth.Contract(
    preEventAbi,
    PRE_EVENT_CONTRACT
  );

  const mintAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
  // console.log(mintAccount);

  console.log("PurchasedMintModal/purchase: ", purchasedID);

  //purchase 구매내역에서의 모달 기능
  const onClickMint = async () => {
    try {
      if (!preEventContract || !account || !mintAccount) return;

      setIsLoading(true);

      // const gasPrice = await web3.eth.getGasPrice();
      const balance = await preEventContract.methods
        .balanceOf(mintAccount.address)
        .call();
      // const tokenId = Number(balance);
      // const nonce = await web3.eth.getTransactionCount(account, "latest");

      const tx = {
        from: mintAccount.address,
        to: PRE_EVENT_CONTRACT,
        gas: 300000n,
        // gasPrice: gasPrice,
        data: preEventContract.methods.mintTicket(account).encodeABI(),
        // value: "0x0",
        maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"),
        maxFeePerGas: web3.utils.toWei("120", "gwei"),
        type: "0x02",
      };

      // console.log("tx:", tx);

      web3.eth
        .estimateGas(tx)
        .then((gasAmount) => {
          console.log("Estiamte Gas:", gasAmount);
        })
        .catch((error) => {
          console.error(error);
        });

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log("tx receipt:", receipt);

      // Minting 성공했으므로, DB의 구매내역에서 isMinted 값 갱신
      //app.post('/api/refund', (req, res) => {
      //const {purchaseID} = req.body;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/mint`,
          { purchasedID }
        );

        if (response.data) {
          console.log("Purchase ticket is minted: ", response.data);
        }
      } catch (error) {
        console.error("[ERR] PurchasedMintModal.jsx/onClickMint: ", error);
      }

      setIsModalOpen(true);
      setIsLoading(false);

      const tokenId = await preEventContract.methods
        .tokenOfOwnerByIndex(mintAccount.address, Number(balance) - 1)
        .call();

      const metadataURI = await preEventContract.methods
        .tokenURI(Number(tokenId))
        .call();

      const response = await axios.get(metadataURI);

      // setMetadata(response.data);
      setMetadataArray([response.data, ...metadataArray]);

      // console.log("metadata:", response.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  //purchase my페이지에서의 모달에서 민팅 성공후 모달
  const onClickPurchsedModalOpen = () => {
    setIsPurchasedModalOpen(!isPurchasedModalOpen);
  };

  return (
    <div>
      {!purchasedMinted && !purchasedRefunded ? (
        <>
          <button
            onClick={onClickPurchsedModalOpen}
            className="hover:bg-[#038BD5] hover:text-white text-2xl border-2 py-2 border-black rounded-md px-2"
          >
            민팅하기
          </button>
          {isPurchasedModalOpen && (
            <div className="bg-black bg-opacity-40 w-full h-full fixed left-0 top-0 ">
              <div className="w-[300px] h-[300px] fixed  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-black bg-white  ">
                <button
                  className="fixed top-0 right-2"
                  onClick={() => {
                    setIsPurchasedModalOpen(!isPurchasedModalOpen);
                  }}
                >
                  x
                </button>
                <ul className="flex items-center justify-center h-full gap-4 flex-col">
                  <div className="flex flex-col gap-4 items-center mt-14 justify-center">
                    <div>민팅을 진행하시겠습니까?</div>
                    <button
                      className={
                        hoverMint
                          ? "flex items-center mt-[3px] ml-[3px] justify-end border-2 border-black py-1 px-[6px] rounded-md text-2xl "
                          : "flex items-center justify-end border-2 border-b-[5px] border-r-[5px] border-black  py-1 px-[6px] rounded-md text-2xl "
                      }
                      onClick={onClickMint}
                      onMouseEnter={() => setHoverMint(true)}
                      onMouseLeave={() => setHoverMint(false)}
                    >
                      민팅하기
                    </button>
                  </div>
                  <div className=" w-[425px] h-[50px]">
                    {isLoading && (
                      <ul className="flex justify-center items-center flex-col">
                        <li>
                          <ImSpinner8 className="animate-spin h-10 w-10" />
                        </li>
                        <li className="mt-2">민팅을 진행중...</li>
                      </ul>
                    )}
                    {isModalOpen && (
                      <div className="bg-black bg-opacity-40 w-full h-full fixed left-0 top-0 ">
                        <ul className="flex-col gap-2 w-[300px] h-[300px]  bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 fixed border-2 border-black flex items-center justify-center z-50">
                          <button
                            className="fixed top-0 right-2"
                            onClick={() => {
                              setIsModalOpen(!isModalOpen);
                            }}
                          >
                            x
                          </button>
                          <li>민팅이 완료되었습니다!</li>
                          <li className="flex gap-3 mt-3">
                            <Link
                              to="/ticket"
                              className={
                                hoverViewTicket
                                  ? "flex items-center mt-[3px] ml-[3px] justify-end border-2 border-black py-1 px-[6px] rounded-md text-md font-semibold "
                                  : "flex items-center justify-end border-2 border-b-[5px] border-r-[5px] border-black  py-1 px-[6px] rounded-md text-md font-semibold "
                              }
                              onMouseEnter={() => setHoverViewTicket(true)}
                              onMouseLeave={() => setHoverViewTicket(false)}
                            >
                              티켓보기
                            </Link>
                            <Link
                              to="/"
                              className={
                                hoverToHome
                                  ? "flex items-center mt-[3px] ml-[3px] justify-end border-2 border-black py-1 px-[6px] rounded-md text-md font-semibold "
                                  : "flex items-center justify-end border-2 border-b-[5px] border-r-[5px] border-black  py-1 px-[6px] rounded-md text-md font-semibold"
                              }
                              onMouseEnter={() => setHoverToHome(true)}
                              onMouseLeave={() => setHoverToHome(false)}
                            >
                              홈으로
                            </Link>
                          </li>
                        </ul>
                        <div className="bg-black w-[305px] ml-2 h-[305px] mt-2 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-"></div>
                      </div>
                    )}
                  </div>
                </ul>
              </div>
              <div className="w-[305px] h-[305px] bg-black ml-14 mt-14"></div>
            </div>
          )}
        </>
      ) : (
        <button className="cursor-not-allowed border-2 border-[#bcbcbc] rounded-md px-2 text-2xl text-[#bcbcbc]  py-2 flex items-center justify-center ">
          민팅하기
        </button>
      )}
    </div>
  );
};

export default PurchasedMintModal;
