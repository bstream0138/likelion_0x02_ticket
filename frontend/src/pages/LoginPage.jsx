import React from 'react';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <div>
            <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
        </div>
    )
}

export default LoginPage;