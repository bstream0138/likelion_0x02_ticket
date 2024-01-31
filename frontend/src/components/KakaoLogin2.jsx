

//backend 연결 버전
const KakaoLogin2 = () => {
    const fetchGetURL = async () => {
        try {
            const {url} = await (
                await fetch("http://localhost:3001/login")
            ).json();

            // 카카오 서버의 응답으로 받은 url
            console.log(url);

            document.location.href = url;

        } catch (error) {
            alert("error - fetchGetURL");
            console.error(error);
        }
    };

    return (
        <button className="kakao" onClick={fetchGetURL}>
            카카오 로그인하기(Backend)
        </button>
    )

}

export default KakaoLogin2;