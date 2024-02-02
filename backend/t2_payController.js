const axios = require('axios');

exports.kakaoPayReady = async (req, res) => {

    try {
        // 상품명, 결제금액
        const { item_name, total_amount } = req.body;

        // 결제 준비 요청
        const response = await axios.post('https://kapi.kakao.com/v1/payment/ready', {
            cid: 'TC0ONETIME', // 테스트용 CID, 실제 운영 시 변경 필요
            partner_order_id: 'partner_order_id', // 파트너 주문번호
            partner_user_id: 'partner_user_id', // 파트너 회원 ID
            item_name, // 상품명
            quantity: 1, // 상품 수량
            total_amount, // 총 결제 금액
            vat_amount: 0, // 부가세
            tax_free_amount: 0, // 비과세 금액
            approval_url: 'http://localhost:3000/pay/success', // 결제 성공 시 리다이렉트 될 URL
            fail_url: 'http://localhost:3000/pay/fail', // 결제 실패 시 리다이렉트 될 URL
            cancel_url: 'http://localhost:3000/pay/cancel', // 결제 취소 시 리다이렉트 될 URL
        }, {
            headers: {
                Authorization: `DEV_SECRET_KEY ${process.env.PAY_DEV_SECRET_KEY}` // 카카오 Admin 키
            }
        });

        console.log('next_redirect_pc_url: ', response.data.next_redirect_pc_url);
        res.json({ next_redirect_pc_url: response.data.next_redirect_pc_url });
        //res.redirect(`http://localhost:3000/main?userID=${userInfo.id}&userName=${userInfo.name}`);

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
            cid: 'TC0ONETIME', // 테스트용 CID, 실제 운영 시 변경 필요
            tid,
            partner_order_id: 'partner_order_id', // 파트너 주문번호
            partner_user_id: 'partner_user_id', // 파트너 회원 ID
            pg_token,
            total_amount
        }, {
            headers: {
                Authorization: `DEV_SECRET_KEY ${process.env.PAY_DEV_SECRET_KEY}` // 카카오 Admin 키
            }
        });

        console.log('response: ', response.data);
        res.send(response.data);

    } catch(error) {
        console.error(error);
        res.status(500).send('Internel Server Error');
    }
};

