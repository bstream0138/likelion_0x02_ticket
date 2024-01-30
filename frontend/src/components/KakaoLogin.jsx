

const KakaoLogin = () => {
    const client_id = '01ec3168b14091c34c3bc41ae919e030';
    const redirect_uri = 'http://localhost:3000/login';
    const response_type = 'code';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
        window.location.href = link;
    };

    const authParam = new URLSearchParams({
        client_id,
        redirect_uri,
        response_type
    })

    return (
        <a href ={`https://kauth.kakao.com/oauth/authorize?${authParam.toString()}`} >
            로그인
        </a>
        
    );

    /*
    <button type='button' onClick={loginHandler}>
            로그인 테스트
        </button>
    */
    
};

export default KakaoLogin;