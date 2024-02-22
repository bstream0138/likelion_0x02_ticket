const axios = require('axios');

exports.kakaoPayReady = async (req, res) => {

    console.log('Pay request: ', req.body);

    const frontend = req.query.frontend;
    let redirectURL;
    if( frontend === 'dev') {
        redirectURL = 'http://localhost:3000'
    } else {
        redirectURL = 'http://happyticket.duckdns.org'
    }

    //온라인 단건 결제 
    // 1) 결제준비 API - 결제 상세정보를 서버에 전달하고, 결제 고유 번호(tid)를 받음
    // 2) 결제요청 API - 결제 준비 API 응답으로 받은 Redirect URL 중 접속 환경에 맞는 URL로 redirect
    // 3) 결제승인 API - 사용자가 결제수단을 선택하고 비밀번호를 입력해 결제 인증을 완료한 뒤 결제 완료 처리

    // 카카오페이 결제 서버: https://open-api.kakaopay.com
    // 카카오페이 목업웹: https://online-pay.kakao.com/mockup/
    try {
        // 상품명, 결제금액
        const { item_name, total_amount, is_mobile } = req.body;
        const approval_url = `${redirectURL}/payment_success`;
        const fail_url = `${redirectURL}/payment_fail`;
        const cancel_url = `${redirectURL}/payment_cancel`;

        // 결제 준비 요청
        const response = await axios.post('https://open-api.kakaopay.com/online/v1/payment/ready', {
            "cid": "TC0ONETIME",
            "partner_order_id": "partner_order_id",
            "partner_user_id": "partner_user_id",
            "item_name": item_name,
            "quantity": 1,
            "total_amount": total_amount,
            "vat_amount": 0,
            "tax_free_amount": 0,
            "approval_url": approval_url,
            "fail_url": fail_url,
            "cancel_url": cancel_url,
        }, {
            headers: {
                Authorization: `DEV_SECRET_KEY ${process.env.PAY_DEV_SECRET_KEY}`,
                'Content-type': 'application/json'
            },
        });

        console.log('kakaoPayReady/response: ', response.data);
        const next_redirect_url = is_mobile ? response.data.next_redirect_mobile_url : response.data.next_redirect_pc_url;
        console.log('kakaoPayReady/next_redirect_url: ', next_redirect_url);
        res.json({ next_redirect_url: next_redirect_url });

    } catch(error) {
        console.error(error);
        res.status(500).send('Internel Server Error');
    }
};

exports.kakaoPayApprove = async (req, res) => {

    try {
        // 결제 성공 시, pg token
        const { pg_token, tid, total_amount } = req.body;

        // 결제 승인 요청
        const response = await axios.post('https://kapi.kakao.com/v1/payment/approve', {
            cid: 'TC0ONETIME',
            tid,
            partner_order_id: 'partner_order_id', // 파트너 주문번호
            partner_user_id: 'partner_user_id', // 파트너 회원 ID
            pg_token,
            total_amount
        }, {
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}` // 카카오 Admin 키
            }
        });

        console.log('kakaoPayApprove/response: ', response.data);
        res.send(response.data);

    } catch(error) {
        console.error(error);
        res.status(500).send('Internel Server Error');
    }
};

