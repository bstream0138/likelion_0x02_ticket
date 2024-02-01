// 카카오 로그인 로직 처리
// 사용자 인증 후, 토큰 발급
// 사용자 정보 조회 로직

// express 서버 설정
// middleware 설정
// 카카오 로그인 관련 라우트 설정

const axios = require('axios');

exports.kakaoLogin = async (req, res) => {
    const code = req.query.code;
    console.log('Kakao code: ', code);
    try {
        const auth_data = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_REST_API_KEY,
            redirect_uri: process.env.KAKAO_REDIRECT_URI,
            code: code,
        }).toString();

        const response = await axios.post('https://kauth.kakao.com/oauth/token',
            auth_data, 
            {headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }}
        );

        const accessToken = response.data.access_token;
        console.log('accessToken: ', accessToken);

        const userInfoResponse = await axios.get(
            'https://kapi.kakao.com/v2/user/me',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        console.log('kakao_id: ', userInfoResponse.data.id )
        console.log('connected_at: ', userInfoResponse.data.connected_at);
        console.log('kakao_nickname: ', userInfoResponse.data.properties.nickname );
        console.log('kakao_image: ', userInfoResponse.data.properties.profile_image );

        const userInfo = {id: userInfoResponse.data.id, name: userInfoResponse.data.properties.nickname};
        res.redirect(`http://localhost:3000/main?userID=${userInfo.id}&userName=${userInfo.name}`);

    } catch(error) {
        console.error(error);
        res.status(500).send('Internel Server Error');
    }
};
