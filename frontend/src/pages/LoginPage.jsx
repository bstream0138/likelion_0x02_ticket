import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Ganache login 처리
import Web3 from 'web3';

const LoginPage = () => {
  // 2가지 Login 방식을 지원한다. Kakao Login / Metamask Login
  // 사용한 Login 방식에 따라 프로그램의 동작이 달라지므로
  // localStorage에 loginFrom 변수를 선언하여 사용자가 어떤 방식으로 로그인 했는지 관리한다
  // 로그인 전 값은 X로 설정하고, 사용자가 Kakao 사용 시 K, Metamask 사용 시 M 으로 설정한다

  // 메타마스크 환경의 여러 주소 사용 가능하도록 수정
  const [accounts, setAccounts] = useState([]); 
  const [selectedAccount, setSelectedAccount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("loginFrom", "X");
  }, []);

  // 카카오 로그인은 버튼 클릭 시, backend에서 로직 처리하기에 backend의 response 호출로 main 페이지로 이동
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
  const connectMetamask = async () => {
    if (window.ethereum) {  // 개발 테스트용 함수이니 Chrome 접근만 가정
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
          console.log('LoginPage.jsx/connectMetamask:',accounts);
          setAccounts(accounts);
          setSelectedAccount(accounts[0]);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("You need Metamask extension");
    }
  };

  const handleAccountSelection = (e) => {
    setSelectedAccount(e.target.value);
  };

  const confirmSelection = () => {
    if(selectedAccount) {
      localStorage.setItem("account", selectedAccount);
      localStorage.setItem("loginFrom", "M");
      navigate("/");
    }
  };

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
        {
          accounts.length > 0 && (
            <>
              <select onChange={handleAccountSelection}>
                {accounts.map((account, index) => (
                  <option key={index} value={account}>
                    {`${account.substring(0,7).toUpperCase()}...${account.substring(account.length - 5).toUpperCase()}`}
                  </option>
                ))}
              </select>
              <button onClick={confirmSelection} className='text-sm bg-gray-300 px-1'>
                확인
              </button>
            </>
          )
        }
      </div>
    </div>
  );
};

export default LoginPage;
