

const KakaoLogin = () => {
    const client_id = '01ec3168b14091c34c3bc41ae919e030';
    const redirect_uri = 'http://localhost:3000/login';
    const response_type = 'code';
    //const kauthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const kauthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;

    const loginHandler = () => {
        window.location.href = kauthURL;
    };

    /*
    const authParam = new URLSearchParams({
        client_id,
        redirect_uri,
        response_type
    })

    <a href ={`https://kauth.kakao.com/oauth/authorize?${authParam.toString()}`} >
            로그인
        </a>
        */

    return (
        <button type='button' onClick={loginHandler}>
            로그인 테스트
        </button>
    );

};

export default KakaoLogin;