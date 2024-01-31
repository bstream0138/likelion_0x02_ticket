const axios = require("axios");

class Kakao {
    constructor() {
        this.key = process.env.KAKAO_REST_API_KEY;
        this.redirectURI = `http://localhost:3000/login`;        
    }

    // 카카오 인가코드를 받아오기 위한 URL 가져오기
    getAuthCodeURL() {
        const kAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${this.key}&redirect_uri=${this.redirectURI}&response_type=code`;   
        return kAuthURL;
    }

    async getUserData(token) {
        const {data} = await axios.get("https://kapi.kakao.com/v2/user/me", {
            header: {
                Authorization: `Bearer ${token}`,

            },
        });

        console.log(data);

        const userData = {
            nickname: data.kakao_account.profile.nickname,
        };

        return userData;        
    }

    async getToken(code) {
        const params = {
            client_id: this.key,
            code,
            grant_type: "authorization_code",
            redirect_uri: this.redirectURI,
        };

        const { data } =await axios.post(
            "https://kauth.kakao.com/oauth/token",
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )

        console.log(data);

        const tokenData = {
            access_token: data.access_token,
            refresh_token: data.refresh_token,

        };

        return tokenData;
    }


}

module.exports.KakaoClient = new Kakao();