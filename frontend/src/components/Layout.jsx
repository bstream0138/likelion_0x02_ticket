import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DevInfo from "./DevInfo";
import MenuBar from "./MenuBar";
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";
import PreEventAbi from "../abis/PreEventAbi.json";
import Web3 from "web3";


const sample_concert = [
  {
    IMAGE: "/bts.jpg",
    TITLE: "BTS",
    CONTENT: "방탄소년단",
    DATE: "2024.02.21",
    PRICE: "100000"
  },
  {
    IMAGE: "/golden_hour.jpg",
    TITLE: "IU",
    CONTENT: "아이유",
    DATE: "2024.03.21",
    PRICE: "110000"
  },
  {
    IMAGE: "/karina.jpg",
    TITLE: "aespa",
    CONTENT: "에스파",
    DATE: "2024.03.03",
    PRICE: "140000"
  },
  {
    IMAGE: "/itzy.jpg",
    TITLE: "ITZY",
    CONTENT: "잇지",
    DATE: "2024.02.21",
    PRICE: "130000"
  },
  {
    IMAGE: "/newjeans.jpeg",
    TITLE: "New jeans",
    CONTENT: "뉴진스",
    DATE: "2024.02.21",
    PRICE: "150000"
  },
  {
    IMAGE: "/hyoshin.jpeg",
    TITLE: "Hyo Shin Park",
    CONTENT: "박효신",
    DATE: "2024.02.21",
    PRICE: "170000"
  },
  {
    IMAGE: "/blackpink.jpeg",
    TITLE: "Black pink",
    CONTENT: "블랙핑크",
    DATE: "2024.02.21",
    PRICE: "200000"
  },
];
//공연정보와 account kakaoId contract 정보


const Layout = () => {
  const [web3, setWeb3] = useState(null);
  const [preEventContract, setPreEventContract] = useState();
  const loginFrom = localStorage.getItem("loginFrom");
  const [account, setAccount] = useState("");
  const [userInfo, setUserInfo] = useState({
    userID: "",
    userName: "",
    userImage: "",
  });

  const current_url = useLocation();

  // concert 정보
  const [concert, setConcert] = useState([]);

  // DB 연결 정보 - (X) 없음, (L) Local SQLite, (A) AWS-MySQL
  const [dbConnection, setDBConnection] = useState(false);

  useEffect( () => {
    const fetchConcert = async () => {
      try {
        const response = await fetch('http://localhost:3001/concert');
        if (response.ok) {
          console.log('Get concert data from DB');
          const data = await response.json();
          setConcert(data);
          setDBConnection(true);
        } else {
          console.error('Fail');
          setConcert(sample_concert);
          setDBConnection(false);
        }
      } catch(error) {
        console.error('Error: ', error);
        setConcert(sample_concert);
        setDBConnection(false);
      }
    }

    fetchConcert();

  }, []);
  
  useEffect(() => {
    if (loginFrom === "K") {
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
    } else if (loginFrom === "M") {
      // Metamask Login
      const account = localStorage.getItem("account");
      setAccount(account);

      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      setPreEventContract(
        new web3.eth.Contract(PreEventAbi, PRE_EVENT_CONTRACT)
      );
    }
  }, [current_url, loginFrom]);

  return (
    <div>
      <DevInfo loginFrom={loginFrom} dbConnection={dbConnection}/>
      <Outlet
        context={{
          loginFrom,
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
