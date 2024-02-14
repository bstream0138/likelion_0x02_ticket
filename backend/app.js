const express = require('express');
const { KakaoClient } = require("./KakaoLogin");
const app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get("/kakao/url", (req,res,next) => {
    console.log("/login start");

    const url = KakaoClient.getAuthCodeURL();

    res.status(200).json({
        url,
    });

    console.log("/login finish");

});

app.post("/login", async(req,res,next) => {
    console.log("/login start");

    try {
        const { code } = req.body;
        // 엑세스 토큰 받아오기
        const { access_token } = await KakaoClient.getToken(code);
        // 유저 정보 받아오기
        const userData = await KakaoClient.getUserData(access_token);

        // DB로 사용자 등록 처리
        // 세션 or 토큰 처리
        // 등등 로그인 관련 처리하기

        res.status(200).json(userData);

    } catch(error) {
        console.error(error);

        const errorData = {
            message: "Internal server error",
        };

        res.status(500).json(errorData);
    }

    console.log("/login finish")

});