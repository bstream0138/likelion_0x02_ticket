import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DevInfo from "./DevInfo";
import MenuBar from "./MenuBar";
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";
import PreEventAbi from "../abis/PreEventAbi.json";
import Web3 from "web3";

const concert = [
  {
    image: "bts.jpg",
    title: "BTS",
    content: "방탄소년단",
    date: "2024.02.21",
    tokenId: "1",
  },
  {
    image: "golden_hour.jpg",
    title: "IU",
    content: "아이유",
    date: "2024.02.21",
    tokenId: "2",
  },
  {
    image: "karina.jpg",
    title: "aespa",
    content: "에스파",
    date: "2024.02.21",
    tokenId: "3",
  },
  {
    image: "itzy.jpg",
    title: "ITZY",
    content: "잇지",
    date: "2024.02.21",
    tokenId: "4",
  },
  {
    image: "newjeans.jpeg",
    title: "New jeans",
    content: "뉴진스",
    date: "2024.02.21",
    tokenId: "5",
  },
  {
    image: "hyoshin.jpeg",
    title: "Hyo Shin Park",
    content: "박효신",
    date: "2024.02.21",
    tokenId: "6",
  },
  {
    image: "blackpink.jpeg",
    title: "Black pink",
    content: "블랙핑크",
    date: "2024.02.21",
    tokenId: "7",
  },
];
//공연정보와 account kakaoId contract 정보

const Layout = () => {
  const [web3, setWeb3] = useState(null);
  const [preEventContract, setPreEventContract] = useState();
  const loginMethod = localStorage.getItem("loginMethod");
  const [account, setAccount] = useState("");
  const [userInfo, setUserInfo] = useState({
    userID: "",
    userName: "",
    userImage: "",
  });

  const current_url = useLocation();

  useEffect(() => {
    if (loginMethod === "K") {
      // Kakao Login
      const queryParams = new URLSearchParams(current_url.search);
      if (queryParams.get("userID")) {
        // backend에서 redirect된 상황이므로 값을 localStorage에 저장
        localStorage.setItem("userID", queryParams.get("userID"));
        localStorage.setItem("userName", queryParams.get("userName"));
        localStorage.setItem("userImage", queryParams.get("userImage"));
      }

      //localStorage에서 userID와 userName 가져오기
      const userID = localStorage.getItem("userID");
      const userName = localStorage.getItem("userName");
      const userImage = localStorage.getItem("userImage");
      console.log("userID: ", userID);
      console.log("userName: ", userName);
      console.log("userImage: ", userImage);
      setUserInfo({ userID, userName, userImage });
    } else if (loginMethod === "M") {
      // Metamask Login
      const account = localStorage.getItem("account");
      setAccount(account);

      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      setPreEventContract(
        new web3.eth.Contract(PreEventAbi, PRE_EVENT_CONTRACT)
      );
    } else if (loginMethod === "G") {
      // Ganache Login
      const account = localStorage.getItem("account");
      setAccount(account);

      const web3 = new Web3("http://127.0.0.1:7545");
      setWeb3(web3);
      setPreEventContract(
        new web3.eth.Contract(PreEventAbi, PRE_EVENT_CONTRACT)
      );
    }
  }, [current_url, loginMethod]);

  return (
    <div>
      <DevInfo loginMethod={loginMethod} />
      <Outlet
        context={{
          loginMethod,
          account,
          setAccount,
          userInfo,
          preEventContract,
          setPreEventContract,
          web3,
          concert,
        }}
      />

      <MenuBar />
    </div>
  );
};

export default Layout;
