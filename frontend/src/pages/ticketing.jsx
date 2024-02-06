import React from 'react';
import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Ticketing = () => {

    // LoginPage에서 사용한 login 방법 확인
    const loginMethod = localStorage.getItem('loginMethod');
    const navigate = useNavigate();
    const [account, setAccount] = useState('');

    // for Kakao Login
    const [userInfo, setUserInfo] = useState({userID: '', userName: '', userImage: ''});
    const current_url = useLocation();

    useEffect(() => {
        if(loginMethod === 'K') {
            // Kakao Login
            const queryParams = new URLSearchParams(current_url.search);
            if(queryParams.get('userID')){            
                // backend에서 redirect된 상황이므로 값을 localStorage에 저장
                localStorage.setItem('userID', queryParams.get('userID'));
                localStorage.setItem('userName', queryParams.get('userName'));
                localStorage.setItem('userImage', queryParams.get('userImage'));
            }

            //localStorage에서 userID와 userName 가져오기
            const userID = localStorage.getItem('userID');
            const userName = localStorage.getItem('userName');
            const userImage = localStorage.getItem('userImage');
            console.log('userID: ', userID);
            console.log('userName: ', userName);
            console.log('userImage: ', userImage);
            setUserInfo({userID, userName, userImage});
        } 
        else if(loginMethod === 'M') {
            // Metamask Login
            const account = localStorage.getItem('account');
            setAccount(account);
        }        
    },[current_url]);


    const handleLogout = () => {
        //localStorage에서 item 삭제
        localStorage.clear();

        //logout 후 root로
        navigate('/');
    }

    const handleGoHome = () => {
      navigate('/home');
  };

    const goToPaymentPage = () => {
      navigate('/pay');
    };


    return (
      <div className="w-[425px] min-h-screen  mx-auto">
        <div>
          {
            loginMethod === 'K' ? (
                <div>                        
                    <li className="text-lg font-semibold">UserID: {userInfo.userID}</li>
                    <li className="text-lg font-semibold">UserName: {userInfo.userName}</li>
                </div>
            ) : (
                <div>
                    <h1 className="text-lg font-semibold">Metamask Account Info</h1>
                    <p className="text-lg">
                        <span>
                            {account.substring(0, 7)}...
                            {account.substring(account.length - 5)}
                        </span>                            
                    </p>
                </div>
            )
          }
        </div>
        <div className="flex items-center justify-center font-bold text-2xl py-4">
          TICKET
        </div>
        
        <div className="header">
          <ul className="w-[425px] overflow-hidden h-[200px] object-contain">
            <img className=" opacity-60 blur-sm" src="../images/a.jpg" alt="" />
          </ul>
          <img
            className="fixed top-[62px] left-[19px] w-[200px] content rounded-md"
            src="/golden_hour.jpg"
            alt=""
          />
        </div>
        <ul className=" pt-2 flex justify-end px-4 pr-[45px]">
          <button 
              className="border-black border rounded-md px-2 py-1 mt-[2px] font-bold text-3xl"
              onClick={goToPaymentPage}
          >
            예매하기
          </button>
          
        </ul>
        <div className="mt-8 px-5">
          <ul className="text-3xl ">2024 콘서트</ul>
          <ul className="text-xs font-light">진짜 끝내주는 콘서트 - 120분</ul>
          <ul className="text-sm mt-1">장소</ul>
          <ul className="text-sm">2024.02.29~2024.03.01</ul>
        </div>
        <div className="px-5 text-2xl font-bold mt-3">CASTING</div>
        <button 
            className="w-full bg-gray-500 text-white font-bold py-3 rounded shadow"
            onClick={handleGoHome} 
        >
            메인으로
        </button>
        <button 
                className="mt-4 bg-black text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
            >
                Logout
        </button>
      </div>
    );
  };
  
  export default Ticketing;