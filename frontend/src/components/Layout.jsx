import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import DevInfo from "./DevInfo";
import MenuBar from "./MenuBar";

/*
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";
import PreEventAbi from "../abis/PreEventAbi.json";
import Web3 from "web3";
*/

import { sample_concert } from "../sample/sample_concert";

const Layout = () => {

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [preEventContract, setPreEventContract] = useState();

  // concert 정보
  const [concert, setConcert] = useState([]);

  useEffect( () => {

    // 서버 연결 확인
    const checkServer = async () => {
      try {
        const response = await fetch('http://localhost:3001/ping');
        if(response.ok) {
          localStorage.setItem("connectDB", "L");
        } else {
          console.error('Server respond, but something goes wrong.');
          localStorage.setItem("connectDB", "X");
        }
      } catch (error) {
        console.error('Server not respond', error);
        localStorage.setItem("connectDB", "X");
      }
    }

    // DB CONCERT 테이블에서 공연 정보 가져오기
    const fetchConcert = async () => {
      try {
        const response = await fetch('http://localhost:3001/concert');
        if (response.ok) {
          console.log('Get concert data from DB');
          const data = await response.json();
          setConcert(data);
          localStorage.setItem("connectDB", "L");
        } else {
          console.error('Fail');
          setConcert(sample_concert);
        }
      } catch(error) {
        console.error('Error: ', error);
        setConcert(sample_concert);
      }
    }

    checkServer();

    fetchConcert();

  }, []);

  return (
    <div>
      <DevInfo />
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
