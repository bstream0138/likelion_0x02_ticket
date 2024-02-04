import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const PaymentPage = () => {
    const navigate = useNavigate();

    // 아래는 카카오페이 테스트를 위한 샘플 상품 코드
    const price = 1000;
    const [quantity, setQuantity] = useState(1); 
    
    const handlePayment = async () => {
        try {
            // 백엔드 서버의 결제 준비 API 주소
            const backendURL = "http://localhost:3001/payReady";

            const total_amount = quantity * price; // 총 결제 금액 계산

            // 결제 요청 정보
            const paymentRequest = {
                item_name: "dj_festival_2024",
                total_amount: total_amount,       // 총 결제 금액
                quantity: quantity,            // 상품 수량
            };

            // 결제 준비 요청
            const response = await axios.post(backendURL, paymentRequest, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const { next_redirect_pc_url } = response.data;
            window.location.href = next_redirect_pc_url;
            
        } catch(error) {
            console.error(error);
        }

    };

    const handleGoMain = () => {
        navigate('/main');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4 py-2">
            <img src="/dj_festival_2024.gif" alt="DJ Festival 2024" className="w-full max-w-xs mb-8" />
            <div className="w-full max-w-xs mb-8">
                <div className="border-b border-gray-200 mb-4">
                    <div className="flex justify-between py-2">
                        <div className="font-semibold">장소:</div>
                        <div>서울랜드</div>
                    </div>
                    <div className="flex justify-between py-2">
                        <div className="font-semibold">공연일자:</div>
                        <div>2024년 6월 15일</div>
                    </div>
                    <div className="flex justify-between py-2">
                        <div className="font-semibold">공연시간:</div>
                        <div>480분</div>
                    </div>
                    <div className="flex justify-between py-2">
                        <div className="font-semibold">가격:</div>
                        <div>{price}원</div>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="quantity" className="mr-2 font-semibold">구매 수량:</label>
                    <select 
                        id="quantity"
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-sm"
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="space-y-4 w-full max-w-xs">
                <button 
                    className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg"
                    onClick={handlePayment}
                >
                    구매하기
                </button>
                <button 
                    className="w-full bg-gray-500 text-white font-bold py-3 rounded shadow"
                    onClick={handleGoMain} 
                >
                    메인으로
                </button>
            </div>
        </div>
    )
    
    

};

export default PaymentPage;



