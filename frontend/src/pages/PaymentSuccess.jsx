import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  useNavigate,
  useLocation,
  useOutletContext,
  Link,
} from "react-router-dom";
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";
import { ImSpinner8 } from "react-icons/im";
import preEventAbi from "../abis/PreEventAbi.json";

import Mint from "../components/Mint";
import Web3 from "web3";

const PaymentSuccess = ({ toggleOpen }) => {
  const { setAccount, setWeb3 } = useOutletContext();
  const [metadataArray, setMetadataArray] = useState([]);
  // const [metadata, setMetadata] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverMint, setHoverMint] = useState(false);
  const [hoverLater, setHoverLater] = useState(false);
  const navigate = useNavigate();
  const [hoverToHome, setHoverToHome] = useState(false);
  const [hoverViewTicket, setHoverViewTicket] = useState(false);

  //민트기능 이동
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;

  const web3 = new Web3(window.ethereum);
  const preEventContract = new web3.eth.Contract(
    preEventAbi,
    PRE_EVENT_CONTRACT
  );
  const account = localStorage.getItem("backupAccount");
  // console.log("Mint/account(2): ", account);
  // console.log("Mint/web3(2): ", web3);

  const mintAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

  const onClickMint = async (e) => {
    try {
      e.preventDefault();
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
        gas: 150254n,
        // gasPrice: gasPrice,
        data: preEventContract.methods.mintTicket(account).encodeABI(),
        // value: "0x0",
        maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"),
        maxFeePerGas: web3.utils.toWei("120", "gwei"),
        type: "0x02",
      };

      console.log("tx:", tx);

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

      console.log("metadata:", response.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 결제 성공 시, localStorage의 customerID와 concertID로 구매 정보 생성
    const customerID = localStorage.getItem("customerID");
    const concertID = localStorage.getItem("concertID");

    const insertPurchase = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/purchase`,
          {
            customerID,
            concertID,
          }
        );

        if (response.data) {
          console.log("Purchase added: ", response.data);
          localStorage.removeItem("concertID");
        }
      } catch (error) {
        console.error("[ERR] PaymentSuccess/insertPurchase: ", error);
      }
    };

    // console.log("PaymentSuccess/useEffect/customerID: ", customerID);
    // console.log("PaymentSuccess/useEffect/concertID: ", concertID);

    if (customerID && concertID) {
      insertPurchase();
    }

    const _web3 = new Web3(window.ethereum);
    setWeb3(_web3);
    const _account = localStorage.getItem("backupAccount");
    setAccount(_account);
  }, []);

  return (
    <>
      <div className="min-h-screen  min-w-screen  md:w-[450px] mx-auto">
        <div className="pt-10">
          <img
            className="mx-auto md:w-[450px] min-w-screen "
            src="ticket-border.png"
            alt=""
          />
          <ul className="md:w-[450px] min-w-screen  h-[120px] flex items-center justify-center mx-auto bg-[#038BD5]">
            <p className="text-4xl">결제 성공 !!</p>
          </ul>
          <div className="md:w-[450px] min-w-screen h-[290px] mx-auto bg-[#038BD5]">
            <ul className="flex items-center justify-center h-full gap-4 flex-col">
              <div className="text-center whitespace-pre-wrap">{`구매후 민팅을 진행하시겠습니까?`}</div>
              <div className="text-xs text-center">
                민팅은 MY메뉴의 구매내역에서도 가능합니다
              </div>
              <div className="flex gap-4 items-center justify-center">
                <button
                  className={
                    hoverMint
                      ? "flex items-center mb-3 justify-end mt-[13px] border-2 border-[#bcbcbc] py-1 px-[10px] rounded-full text-black bg-white"
                      : "flex items-center  mb-3 justify-end mt-[10px] border-2 border-b-[5px] border-[#bcbcbc]  py-1 px-[10px] rounded-full text-black bg-white"
                  }
                  onClick={onClickMint}
                  onMouseEnter={() => setHoverMint(true)}
                  onMouseLeave={() => setHoverMint(false)}
                >
                  민팅하기
                </button>
                <button
                  className={
                    hoverLater
                      ? "flex items-center mb-3 justify-end mt-[13px] border-2 border-[#bcbcbc] py-1 px-[10px] rounded-full text-black bg-white"
                      : "flex items-center mb-3 justify-end mt-[10px] border-2 border-b-[5px] border-[#bcbcbc]  py-1 px-[10px] rounded-full text-black bg-white"
                  }
                  onClick={() => navigate("/")}
                  onMouseEnter={() => setHoverLater(true)}
                  onMouseLeave={() => setHoverLater(false)}
                >
                  나중에
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
                    <ul className="flex-col gap-2 w-[300px] h-[300px]  bg-white left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 fixed border-2 border-black flex items-center justify-center z-50">
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
                    <div className="bg-black w-[305px] ml-2 h-[305px] mt-2 fixed left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 z-40"></div>
                  </div>
                )}
              </div>
            </ul>
            <img
              className="mx-auto md:w-[450px] min-w-screen "
              src="ticket-head.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
