import React from 'react';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center mt-12">
                <a href={KAKAO_AUTH_URL} className="bg-yellow-300 text-black font-bold py-3 px-6 rounded-lg" >
                    Kakao Login
                </a>
            </div>
        </div>
    )
}

export default LoginPage;