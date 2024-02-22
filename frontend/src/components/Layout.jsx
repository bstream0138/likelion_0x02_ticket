import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuBar from "./MenuBar";

/*
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";
import PreEventAbi from "../abis/PreEventAbi.json";
import Web3 from "web3";
*/

import { sample_concert } from "../sample/sample_concert";
import Header from "./Header";

const Layout = () => {
  
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [preEventContract, setPreEventContract] = useState();

  // concert 정보
  const [concert, setConcert] = useState([]);

  useEffect(() => {
    //localStorage 초기화
    //localStorage.clear();
    
    // DB CONCERT 테이블에서 공연 정보 가져오기
    const fetchConcert = async () => {
      console.log("Get concert data from DB...");
      try {
        const response = await fetch("http://localhost:3001/api/concert");
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

  return (
    <div className="border-2 w-[450px] mx-auto border-black">
      <Header account={account} />
      <Outlet
        context={{
          account,
          setAccount,
          preEventContract,
          setPreEventContract,
          web3,
          setWeb3,
          concert,
        }}
      />

      <MenuBar />
    </div>
  );
};

export default Layout;
