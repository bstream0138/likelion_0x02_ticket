import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// App은 2가지 Login 방식 지원: (1) Kakao Login (2) Metamask Login
// User가 사용한 Login 방식은 localStorage에 loginFrom 변수를 선언하여 관리
// loginFrom value: 로그인 전 값 X, Kakao 사용 시 K, Metamask 사용 시 M

const LoginPage = () => {

  const [accounts, setAccounts] = useState([]); 
  const [selectedAccount, setSelectedAccount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("loginFrom", "X");
  }, []);

  // 카카오 로그인 관련
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
  const connectMetamask = async () => {
    if (window.ethereum) {  
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
          params: [
            {
              chainId: 11155111,  // Sepolia 테스트넷
            },
          ],
        });
        if (accounts.length > 0) {
          //console.log('LoginPage.jsx/connectMetamask:',accounts);
          //console.log('LoginPage.jsx/connectMetamask/accounts[0] :', accounts[0]);
          setAccounts(accounts);          
          setSelectedAccount(accounts[0]);  // setting default value
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("You need Metamask extension");
    }
  };

  const handleAccountSelection = (e) => {
    const newSelectedAccount = e.target.value
    setSelectedAccount(newSelectedAccount);
    //console.log('LoginPage.jsx/handleAccountSelection:', newSelectedAccount);
  };

  const confirmSelection = async () => {
    if(selectedAccount) {
      //console.log('LoginPage.jsx/confirmSelection/selectedAccount:', selectedAccount);
      navigate(`/login_success?login_from=M&account=${selectedAccount}`);
    };
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
