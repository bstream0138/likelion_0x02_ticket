// express 서버 설정
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// middleware 설정
// 카카오 로그인 관련 라우트 설정
const app = express();
const port = 3001;
const authController = require('./t2_authController');
const payController = require('./t2_payController');

//app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
}));

// KakaoPay의 paymentRequest 등 JSON 구조체 처리 위해 추가
app.use(express.json());

app.get('/oauth', authController.kakaoLogin);
app.post('/payReady', payController.kakaoPayReady);
app.post('/PayApprove', payController.kakaoPayApprove);

app.listen(port, () => {
    console.log(`Sample app listening at http://localhost:${port}`);
});
