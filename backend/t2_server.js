// express 서버 설정
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

// middleware 설정
// 카카오 로그인 관련 라우트 설정
const app = express();
const port = process.env.SERVER_PORT || 3001;
const authController = require('./t2_authController');
const payController = require('./t2_payController');

const localDB = new sqlite3.Database(
    './local_database.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if(err) {
            console.error('Error open or create DB: ', err);
        } else {
            console.log('Connect to Local SQLite DB.');
            localDB.serialize( () => {
                //Table 없는 경우, table 부터 생성
                localDB.run(`
                CREATE TABLE IF NOT EXISTS CUSTOMER (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    LOGIN_FROM TEXT,
                    ADDR TEXT,
                    PRI_KEY TEXT                    
                )
                `);

                localDB.run(`
                CREATE TABLE IF NOT EXISTS CONCERT (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    TITLE TEXT,
                    LOCATION TEXT,
                    PRICE INTEGER                    
                )
                `);

                localDB.run(`
                CREATE TABLE IF NOT EXISTS PURCHASE (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    CUSTOMER_ID INTEGER,
                    CONCERT_ID INTEGER,
                    DATE TEXT,
                    IS_MINTING INTERGER,
                    IS_REFUNDED INTEGER,
                    FOREIGN KEY(CUSTOMER_ID) REFERENCES CUSTOMER(ID), 
                    FOREIGN KEY(CONCERT_ID) REFERENCES CONCERT(ID)
                )
                `);
            });
        }
    });

//app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
}));

// KakaoPay의 paymentRequest 등 JSON 구조체 처리 위해 추가
app.use(express.json());

app.get('/oauth', authController.kakaoLogin);
app.post('/payReady', payController.kakaoPayReady);
app.post('/PayApprove', payController.kakaoPayApprove);

app.post('/login', (req, res) => {
    const { loginMethod, account } = req.body;

    const query = `SELECT * FROM CUSTOMER WHERE ADDR = ?`;
    localDB.get(query, [account], (err,row) => {
        if (err) {
            res.status(500).json({'error':err});
            return;
        }

        if (row) {
            // 이미 가입한 회원인 경우 메세지 처리
            res.json({'message': 'user exists','user':row});
        } else {
            // 조회 결과가 없다면, 사용자 정보 추가
            const insert = `INSERT INTO CUSTOMER (LOGIN_FROM, ADDR) VALUES (?, ?)`;
            localDB.run(insert, [loginMethod, account], function(err) {
                if (err) {
                    res.status(500).json({"error": err.message});
                    return;
                }
                res.json({"message": "User add", "id": this.lastID});
            });
        }

    })

});

app.post('/purchase', (req, res) => {
    const { customer_id, concert_id} = req.body;
    localDB.run(`
    INSERT INTO 
    PURCHASE    (CUSTOMER_ID, CONCERT_ID, DATE, IS_MINTING, IS_REFUNDED ) 
    VALUES      (?, ?, '20240217', 0, 0)
    `, [customer_id, concert_id], 
    function(err) {
        if(err) {
            return console.log(err);
        }
        res.json({id: this.lastID});    // 마지막 ID = 새로 생성된 구매 정보 반환
    });

});

app.get('/concert', (req,res) => {
    localDB.all('SELECT * FROM CONCERT', [], (err, rows) => {
        if(err) {
            throw err;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Sample app listening at http://localhost:${port}`);
});
