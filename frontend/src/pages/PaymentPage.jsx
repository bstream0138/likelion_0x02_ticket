import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const PaymentPage = () => {

    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            // 백엔드 서버의 결제 준비 API 주소
            const backendURL = "http://localhost:3001/payReady";

            // 결제 요청 정보
            const paymentRequest = {
                item_name: "테스트 상품",
                total_amount: 10,       // 총 결제 금액
                quantity: 1,            // 상품 수량
            };

            // 결제 준비 요청
            const response = await axios.post(backendURL, paymentRequest, {
                headers: {
                    'Content-Type': 'application/json',
                    // 추가적인 헤더가 필요하다면 여기에 명시합니다.
                }
            });
            const { next_redirect_pc_url } = response.data;
            
            // 결제 페이지로 이동
            window.location.href = next_redirect_pc_url;
            
        } catch(error) {
            console.error(error);
        }

    }

    const handleGoMain = () => {
        navigate('/main');
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="text-center">                
                <li>카카오페이 결제 테스트</li>
                <button 
                    className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={handlePayment}
                >
                        결제
                </button>
            </div>
            <div>
                <button 
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleGoMain} 
                >
                    Go Main
                </button>
            </div>
        </div>
    )
}

export default PaymentPage;


