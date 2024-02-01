import React from 'react';
import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
    const [userInfo, setUserInfo] = useState({userID: '', userName: ''});
    const current_url = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(current_url.search);
        
        // url에 userID가 있는 경우 
        if(queryParams.get('userID')){            
            // backend에서 redirect된 상황이므로 값을 localStorage에 저장
            localStorage.setItem('userID', queryParams.get('userID'));
            localStorage.setItem('userName', queryParams.get('userName'));
        }

        //localStorage에서 userID와 userName 가져오기
        const userID = localStorage.getItem('userID');
        const userName = localStorage.getItem('userName');
        setUserInfo({userID, userName});
    },[current_url]);

    return (
        <div>
            Main
            <li>UserID: {userInfo.userID}</li>
            <li>UserName: {userInfo.userName}</li>
        </div>
    )
}

export default MainPage;