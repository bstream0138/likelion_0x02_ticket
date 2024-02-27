//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

// express 서버 설정
const app = express();
const port = process.env.SERVER_PORT || 3001;

// Kakao API 설정
const authController = require('./t2_authController');
const payController = require('./t2_payController');

let kakaoAccessToken;

const mariaDB = mysql.createPool(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    }
);

    
app.use(cors({
    origin: ['https://happyticket.duckdns.org', 'http://localhost:3000']
}));

// JSON 구조체 처리 위해 추가
app.use(express.json());

// Server 동작 확인
app.get('/api/ping', async (req,res) => {
    console.log('t1_server.js/ping: check connection');
    res.status(200).send('ping');
});

// Kakao API
app.get('/api/oauth', authController.kakaoLogin);
app.post('/api/logout', authController.kakaoLogout);
app.post('/api/payReady', payController.kakaoPayReady);
//app.post('/api/payApprove', payController.kakaoPayApprove);

//
app.post('/api/login', async (req, res) => {
    console.log('/api/login')
    const { loginFrom, account } = req.body;
    console.log('t1_server.js/login:', req.body);

    try {
        const _query = `SELECT * FROM CUSTOMER WHERE ADDR = ?`
        const [rows, fields] = await mariaDB.query(_query, [account]);
        const row = rows[0];
        if (row) {  // 이미 가입한 회원
            console.log('t1_server.js/login: user exists');
            res.json({'MSG': 'user exists','ID': row.ID});
        } else {    // 미가입 회원 --> 사용자 정보 추가
            const [result] = await mariaDB.query(`INSERT INTO CUSTOMER (LOGIN_FROM, ADDR) VALUES (?, ?)`, [loginFrom, account]);
            console.log('t1_server.js/login: user add');
            res.json({"MSG": "User add", "ID": result.insertId});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({'error': err.message});
    }
});

app.get('/api/purchase_list', async (req, res) => {
    console.log('/api/purchase_list')
    const customerID = req.query.customerID;
    if (!customerID) {
        return res.status(400).send('Customer ID is required');
    }

    try {
        const _query = `
                        SELECT 
                            p.ID AS ID, 
                            c.IMAGE AS IMAGE, 
                            c.TITLE AS TITLE,
                            c.CONTENT AS CONTENT,
                            c.LOCATION AS LOCATION,
                            c.DATE AS CONCERT_DATE,
                            p.DATE AS PURCHASE_DATE,
                            c.TICKET_ADDR,
                            c.COLLECTION_ADDR,
                            p.IS_REFUNDED,
                            p.IS_MINTED
                        FROM PURCHASE p
                        JOIN CONCERT c ON p.CONCERT_ID = c.ID
                        WHERE p.CUSTOMER_ID = ?
                        ORDER BY p.DATE;
                    `;
        const [rows, fields] = await mariaDB.query(_query, [customerID]);
        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({'error': err.message});
    }
});

app.post('/api/purchase', async (req, res) => {
    console.log('/api/purchase')
    const { customerID, concertID} = req.body;
    console.log('/api/purchase/customerID: ', customerID);
    console.log('/api/purchase/concertID: ', concertID);
    const purchaseDate = new Date(new Date().getTime()+(9*60*60*1000)).toISOString().slice(0,19).replace('T', ' '); // YYYY-MM-DD HH:MM:SS format
    
    try {
        const _query =  `
                        INSERT INTO 
                        PURCHASE    (CUSTOMER_ID, CONCERT_ID, DATE, IS_MINTED, IS_REFUNDED ) 
                        VALUES      (?, ?, ?, 0, 0)
                        `;
        
        // MariaDB를 사용하여 쿼리 실행
        const result = await mariaDB.query(_query, [customerID, concertID, purchaseDate]);
        
        // 새로 생성된 구매 정보의 ID를 얻습니다.
        const insertedId = result.insertId;

        console.log('/api/purchase/insertedId: ', insertedId);

        // 삽입된 구매 정보에 대한 상세 정보 조회
        const getPurchaedQuery = `
            SELECT p.ID AS ID, 
                c.IMAGE AS IMAGE, 
                c.TITLE AS TITLE,
                c.CONTENT AS CONTENT,
                c.LOCATION AS LOCATION,
                c.DATE AS CONCERT_DATE,
                p.DATE AS PURCHASE_DATE,
                c.TICKET_ADDR,
                c.COLLECTION_ADDR,
                p.IS_REFUNDED,
                p.IS_MINTED 
            FROM PURCHASE p
            JOIN CONCERT c ON p.CONCERT_ID = c.ID
            WHERE p.ID = ?
        `;
        
        // 상세 정보 조회 쿼리 실행
        const [purchase] = await mariaDB.query(getPurchaedQuery, [insertedId]);
        console.log('/api/purchase/result -> ',purchase[0]);
        
        // 조회된 상세 정보를 클라이언트에 반환
        if (purchase.length > 0) {
            res.json({'MSG': 'Success', 'purchase': purchase[0]});
        } else {
            res.status(404).json({'error': 'Purchase Info not found for the inserted ID'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({'error': err.message});
    }
});


app.post('/api/store_kinfo', async (req, res) => {
    console.log('/api/store_kinfo')
    const {loginFrom, userID, userName, privateKey, address} = req.body;

    try {
        const _query = 'SELECT ID, ADDR FROM CUSTOMER WHERE LOGIN_FROM = ? AND K_ID = ?';
        const [rows] = await mariaDB.query(_query, [loginFrom, userID]);
        const row = rows[0];
        if(row) {   // 기존재하는 ID
            res.json({ID: row.ID, ADDR: row.ADDR});
        } else {    // 신규 고객정보 Insert
            const [result] = await mariaDB.query(
                'INSERT INTO CUSTOMER (LOGIN_FROM, ADDR, K_ID, PRI_KEY) VALUES (?,?,?,?)',
                [loginFrom, address, userID, privateKey]
                );

            console.log('t1_server.js/login: user add');
            res.json({ID: result.insertID, ADDR: address});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({'error': err.message});
    }

});

app.post('/api/refund', async (req, res) => {
    console.log('/api/refund')
    const {purchaseID} = req.body;

    if (!purchaseID) {
        return res.status(400).send('Purchase ID required');
    }

    try {
        const _query = 'UPDATE PURCHASE SET IS_REFUNDED = 1 WHERE ID = ?';
        const [result] = await mariaDB.query(_query, [purchaseID]);
        res.json({result});

    } catch (err) {
        console.error(err);
        res.status(500).json({'error': err.message});
    }
});

app.post('/api/mint', async (req, res) => {
    console.log('/api/mint')
    const {purchaseID} = req.body;

    if (!purchaseID) {
        return res.status(400).send('Purchase ID required');
    }

    try {
        const _query = 'UPDATE PURCHASE SET IS_MINTED = 1 WHERE ID = ?';
        const [result] = await mariaDB.query(_query, [purchaseID]);
        res.json({result});

    } catch (err) {
        console.error(err);
        res.status(500).json({'error': err.message});
    }
});

app.get('/api/concert', async (req,res) => {
    console.log('/api/concert')

    try {        
        const _query = 'SELECT * FROM CONCERT';
        const [rows, fields] = await mariaDB.query(_query);
        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({'error': err.message});
    }
    console.log('- Job done.')
});

app.listen(port, () => {
    console.log(`Sample app listening at PORT:${port}`);
});
