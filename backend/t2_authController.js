// 카카오 로그인 로직 처리
// 사용자 인증 후, 토큰 발급
// 사용자 정보 조회 로직

// express 서버 설정
// middleware 설정
// 카카오 로그인 관련 라우트 설정

const axios = require("axios");

exports.kakaoLogin = async (req, res) => {
  const code = req.query.code;
  console.log("Kakao code: ", code);

  // frontend 호출자에 따른 redirectURL 변경
  const refererURL = req.headers.referer || '';
  let redirectURL;
  if( refererURL.includes('localhost')) {
      redirectURL = 'http://localhost:3000'
  } else {
      redirectURL = 'https://happyticket.duckdns.org'
  }
  console.log('kakaoLogin/redirectURL:', redirectURL);
  
  try {
    const auth_data = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_REST_API_KEY,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code: code,
    }).toString();

    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      auth_data,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    const accessToken = response.data.access_token;
    console.log("accessToken: ", accessToken);

    const userInfoResponse = await axios.get(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("kakao_id: ", userInfoResponse.data.id);
    console.log("connected_at: ", userInfoResponse.data.connected_at);
    console.log("kakao_nickname: ", userInfoResponse.data.properties.nickname);
    console.log(
      "kakao_image: ",
      userInfoResponse.data.properties.profile_image
    );

    const userInfo = {
      id: userInfoResponse.data.id,
      name: userInfoResponse.data.properties.nickname,
      profile: userInfoResponse.data.properties.profile_image,
    };
    res.redirect(
      `${redirectURL}/login_success?login_from=K&userID=${userInfo.id}&userName=${userInfo.name}&userImage=${userInfo.profile}`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internel Server Error");
  }
};

exports.kakaoLogout = async (req, res) => {
  const accessToken = req.body.accessToken; // frontend에서 보낸 accessToken

  try {
      const logoutResponse = await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
      });

      console.log('Logout successful:', logoutResponse.data);
      res.status(200).send('Logout successful');
  } catch (error) {
      console.error('Logout failed:', error);
      res.status(500).send('Logout failed');
  }


};

