import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuBar from "./MenuBar";

import { sample_concert } from "../sample/sample_concert";
import Header from "./Header";
import { PiMapPinLight } from "react-icons/pi";

const Layout = () => {
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [preEventContract, setPreEventContract] = useState();

  // concert 정보
  const [concert, setConcert] = useState([]);
  // user 정보
  const [userInfo, setUserInfo] = useState({
    userID: 0,
    userName: "",
    userImage: "",
  });

  useEffect(() => {
    //localStorage 초기화
    //localStorage.clear();

    // DB CONCERT 테이블에서 공연 정보 가져오기
    const fetchConcert = async () => {
      console.log("Get concert data from DB...");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/concert`
        );
        console.log("fetchConcert: ", response);
        if (response.ok) {
          console.log("Success.");
          const data = await response.json();
          setConcert(data);
          localStorage.setItem("connectDB", "L");
        } else {
          console.error("Fail");
          setConcert(sample_concert);
        }
      } catch (error) {
        console.error("Error: ", error);
        setConcert(sample_concert);
      }
    };
    fetchConcert();
  }, []);

  //모바일이면 미니멈스크린 PC의경우 픽셀고정
  return (
    <>
      <div className="border-2 min-w-screen min-h-screen mx-auto md:w-[450px] border-black">
        <Header account={account} userInfo={userInfo} />
        <Outlet
          context={{
            account,
            setAccount,
            preEventContract,
            setPreEventContract,
            web3,
            setWeb3,
            concert,
            setUserInfo,
            userInfo,
          }}
        />
        <MenuBar />
      </div>
    </>
  );
};

export default Layout;
