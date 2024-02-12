import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Ganache login 처리
import Web3 from 'web3';

const LoginPage = () => {
  // 2가지 Login 방식을 지원한다.
  // (1) Kakao Login
  // (2) Metamask Login
  // 선택한 Login 방식에 따라 프로그램의 동작이 달라지므로
  // localStorage에 loginMethod 변수를 선언하여 관리한다. 해당 값이 K이면 Kakao, M이면 Metamask
  // loginMethod 변수는 페이지 로딩 시, 바로 선언하고 default value는 K로 한다.
  useEffect(() => {
    localStorage.setItem("loginMethod", "K");
  }, []);

  // for Kakao Login
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // 카카오 로그인은 버튼 클릭 시, backend에서 로직 처리하기에 backend의 response 호출로 main 페이지로 이동

  // for Metamask Login
  const navigate = useNavigate();
  // 메타마스크 로그인은 버튼 클릭 시, frontend에서 로직 처리하기에 navigate를 이용하여 main 페이지로 이동

  const connectMetamask = async () => {
    if (window.ethereum) {
      // 개발 테스트용 함수이니 Chrome 접근만 가정
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
          // Sepolia 테스트넷으로 접속하도록 chain ID 지정
          params: [
            {
              chainId: 11155111,

            },
          ],
        });
        if (accounts.length > 0) {
          console.log("Connected to Metamask");
          localStorage.setItem("loginMethod", "M");
          // Metamask 로그인인 경우, 계좌 정보를 localStorage에 저장
          localStorage.setItem("account", accounts[0]);
          navigate("/home");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("You need Metamask extension");
    }
  };

  // for Ganache Login
  const connectGanache = async () => {
    try {
      const web3 = new Web3("http://127.0.0.1:7545")
      const accounts = await web3.eth.getAccounts();

      if(accounts.length > 0){
        console.log("Connected to Ganache");
        localStorage.setItem("loginMethod", "G");
          // Ganache 로그인인 경우, 로컬 환경의 첫번째 주소를 지갑 주소로 사용
          localStorage.setItem("account", accounts[0]);
          navigate("/home");
      }

    } catch (error) {
      console.error("Check Ganache: ", error);
    }
  }


  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <div className="text-center mt-12">
        <a
          href={KAKAO_AUTH_URL}
          className="flex inline-block w-48 bg-yellow-300 text-black font-bold py-3 px-6 rounded-lg"
        >
          <img src="/kakao_emblem.png" alt="M" className="w-6 h-6 mr-2" />
          Kakao
        </a>
      </div>
      <div className="text-center mt-12">
        <button
          onClick={connectMetamask}
          className="flex inline-block w-48 bg-blue-500 text-white font-bold py-3 px-6 rounded-lg"
        >
          <img src="/metamask_emblem.png" alt="M" className="w-6 h-6 mr-2" />
          Metamask
        </button>
      </div>
      <div className="text-center mt-12">
        <button
          onClick={connectGanache}
          className="flex inline-block w-48 bg-gray-100 text-black font-bold py-3 px-6 rounded-lg"
        >
          <img src="/ganache_emblem.png" alt="M" className="w-6 h-6 mr-2" />
          Ganache
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
