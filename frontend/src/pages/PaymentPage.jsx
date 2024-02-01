import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const PaymentPage = () => {
    const handlePayment = async () => {
        try {
            
        } catch(error) {
            console.error(error);
        }

    }

    return (
        <div>
            <li>카카오페이 결제 테스트</li>
            <button onClick={handlePayment}>결제</button>
        </div>
    )
}

export default PaymentPage;