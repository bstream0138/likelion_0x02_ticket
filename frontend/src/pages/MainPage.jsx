import React from 'react';
import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

//카카오 로그아웃 기능 (추후 옮길 예정)
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [userInfo, setUserInfo] = useState({userID: '', userName: '', userImage: ''});
    const current_url = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(current_url.search);
        
        // url에 userID가 있는 경우 
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
    },[current_url]);

    //카카오 로그아웃 기능 (추후 옮길 예정)
    const navigate = useNavigate();
    const handleLogout = () => {
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.logout(function() {
                console.log('Logout')
            });
        }
        //localStorage에서 item 삭제
        localStorage.removeItem('userID');
        localStorage.removeItem('userName');
        localStorage.removeItem('userImage');

        //logout 후 root로
        navigate('/');
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="text-center">
                Main
                <div className="mb-4">
                    <img src={userInfo.userImage} alt="user" className="mx-auto h-24 w-24 rounded-full" />
                </div>
                <li className="text-lg font-semibold">UserID: {userInfo.userID}</li>
                <li className="text-lg font-semibold">UserName: {userInfo.userName}</li>
                <button 
                    className="mt-4 bg-black text-white font-bold py-2 px-4 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>            
        </div>
    )
}

export default MainPage;