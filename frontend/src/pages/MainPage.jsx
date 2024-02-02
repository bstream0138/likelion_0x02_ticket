import React from 'react';
import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MainPage = () => {
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

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="text-center">                
                Main
                {
                    loginMethod === 'K' ? (
                        <div>                        
                            <div className="mb-4">
                                <img src={userInfo.userImage} alt="user" className="mx-auto h-24 w-24 rounded-full" />
                            </div>
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
            <button 
                className="mt-4 bg-black text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}

export default MainPage;