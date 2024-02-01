// express 서버 설정
const express = require('express');
require('dotenv').config();

// middleware 설정
// 카카오 로그인 관련 라우트 설정
const app = express();
const port = 3001;
const authController = require('./t2_authController');

app.get('/oauth', authController.kakaoLogin);

app.listen(port, () => {
    console.log(`Sample app listening at http://localhost:${port}`);
});
