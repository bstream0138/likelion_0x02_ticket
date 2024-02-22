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

let kakaoAccessToken;

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
                    K_ID TEXT,
                    PRI_KEY TEXT                    
                )
                `);

                localDB.run(`
                CREATE TABLE IF NOT EXISTS CONCERT (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    IMAGE TEXT,
                    TITLE TEXT,
                    CONTENT TEXT,
                    DATE TEXT,
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
                    IS_MINTED INTERGER,
                    IS_REFUNDED INTEGER,
                    FOREIGN KEY(CUSTOMER_ID) REFERENCES CUSTOMER(ID), 
                    FOREIGN KEY(CONCERT_ID) REFERENCES CONCERT(ID)
                )
                `);

                localDB.get("SELECT COUNT(*) AS count FROM CONCERT", (err, row) => {
                    if(err) {
                        console.error('Error checking CONCERT table: ', err);
                    } else if(row.count === 0) { // CONCERT table is empty
                        // Insert sample data into CONCERT table
                        localDB.run(`
                        INSERT INTO CONCERT (IMAGE, TITLE, CONTENT, DATE, LOCATION, PRICE) VALUES 
                        ('/db_bts.jpg', 'BTS', '방탄소년단', '2024.02.21', '', 100000),
                        ('/IU.jpg', 'IU', '아이유', '2024.03.21', '', 110000),
                        ('/karina.jpg', 'aespa', '에스파', '2024.03.03', '', 140000),
                        ('/itzy.jpg', 'ITZY', '잇지', '2024.02.21', '', 130000),
                        ('/newjeans.jpeg', 'New jeans', '뉴진스', '2024.02.21', '', 150000),
                        ('/hyoshin.jpeg', 'Hyo Shin Park', '박효신', '2024.02.21', '', 170000),
                        ('/blackpink.jpeg', 'Black pink', '블랙핑크', '2024.02.21', '', 200000);
                        `);
                    }
                });
            });
        }
    });

//app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
}));

// KakaoPay의 paymentRequest 등 JSON 구조체 처리 위해 추가
app.use(express.json());

// Server 동작 확인용
app.get('/ping', (req,res) => {
    console.log('t2_server.js/ping: check connection');
    res.status(200).send('ping');
});

app.get('/oauth', authController.kakaoLogin);
app.post('/payReady', payController.kakaoPayReady);
app.post('/PayApprove', payController.kakaoPayApprove);

app.post('/login', (req, res) => {
    const { loginFrom, account } = req.body;

    console.log('t2_server.js/login:', req.body);


    const query = `SELECT * FROM CUSTOMER WHERE ADDR = ?`;
    localDB.get(query, [account], (err,row) => {
        if (err) {
            res.status(500).json({'error':err});
            return;
        }

        if (row) {
            console.log('t2_server.js/login: user exists');
            // 이미 가입한 회원인 경우 메세지 처리
            res.json({'MSG': 'user exists','ID':row.ID});
        } else {
            // 조회 결과가 없다면, 사용자 정보 추가
            const insert = `INSERT INTO CUSTOMER (LOGIN_FROM, ADDR) VALUES (?, ?)`;
            localDB.run(insert, [loginFrom, account], function(err) {
                if (err) {
                    res.status(500).json({"error": err.message});
                    return;
                }
                console.log('t2_server.js/login: user add');
                res.json({"MSG": "User add", "ID": this.lastID});
            });
        }
    })

});

app.get('/purchase_list', (req, res) => {
    const customerID = req.query.customerID;
    if (!customerID) {
        return res.status(400).send('Customer ID is required');
    }

    const query = `
        SELECT 
            p.ID AS ID, 
            c.IMAGE AS IMAGE, 
            c.CONTENT AS CONTENT, 
            c.DATE AS CONCERT_DATE,
            p.DATE AS PURCHASE_DATE,
            p.IS_REFUNDED,
            p.IS_MINTED
        FROM PURCHASE p
        JOIN CONCERT c ON p.CONCERT_ID = c.ID
        WHERE p.CUSTOMER_ID = ?;
    `;

    localDB.all(query, [customerID], (err, rows) => {
        if (err) {
            console.error('[ERR] purchase_list: ', err);
            return res.status(500).json({err:'[ERR] purchase_list'});
        }

        res.json(rows);
    });

});

app.post('/purchase', (req, res) => {
    const { customerID, concertID} = req.body;
    const purchaseDate = new Date().toISOString().slice(0,19).replace('T', ' '); // YYYY-MM-DD HH:MM:SS format
    
    localDB.run(`
    INSERT INTO 
    PURCHASE    (CUSTOMER_ID, CONCERT_ID, DATE, IS_MINTED, IS_REFUNDED ) 
    VALUES      (?, ?, ?, 0, 0)
    `, [customerID, concertID, purchaseDate], 
    function(err) {
        if(err) {
            return console.log(err);
        }
        console.log('t2_server.js/purchase: ',customerID, concertID);
        res.json({'MSG': 'Success', 'ID': this.lastID});    // 마지막 ID = 새로 생성된 구매 정보 반환
    });

});


app.post('/store_kinfo', (req, res) => {
    const {loginFrom, userID, userName, privateKey, address} = req.body;

    localDB.get(
        'SELECT ID, ADDR FROM CUSTOMER WHERE LOGIN_FROM = ? AND K_ID = ?',
        [loginFrom, userID], (err, row) => {
            if(err) {
                console.error(err);
                res.status(500).send('server error');
            } else if(row) {
                //기존재하는 ID
                res.json({ID: row.ID, ADDR: row.ADDR});
            } else {
                //신규 고객정보 Insert
                localDB.run(
                    'INSERT INTO CUSTOMER (LOGIN_FROM, ADDR, K_ID, PRI_KEY) VALUES (?,?,?,?)',
                    [loginFrom, address, userID, privateKey], function(err) {
                        if (err) {
                            console.error(err.message);
                            res.status(500).send('server error');
                        } else {
                            res.json({ID: this.lastID, ADDR: address});
                        }
                    }
                );
            }
    });

});

app.post('/refund', (req, res) => {
    const {purchaseID} = req.body;

    if (!purchaseID) {
        return res.status(400).send('Purchase ID required');
    }

    localDB.get(
        'UPDATE PURCHASE SET IS_REFUNDED = 1 WHERE ID = ?',
        [purchaseID], (err) => {
            if(err) {
                console.error(err);
                res.status(500).send('error updating purchase table:is_refunded');
            }
            if (this.changes > 0) {
                res.json({});

            } else {
                res.status(404).send('purchase ID not found');
            }
    });
});

app.post('/mint', (req, res) => {
    const {purchaseID} = req.body;

    if (!purchaseID) {
        return res.status(400).send('Purchase ID required');
    }

    localDB.get(
        'UPDATE PURCHASE SET IS_MINTED = 1 WHERE ID = ?',
        [purchaseID], (err) => {
            if(err) {
                console.error(err);
                res.status(500).send('error updating purchase table:is_minted');
            }
            if (this.changes > 0) {
                res.json({});

            } else {
                res.status(404).send('purchase ID not found');
            }
    });
});

app.get('/concert', (req,res) => {
    console.log('/api/concert')
    localDB.all('SELECT * FROM CONCERT', [], (err, rows) => {
        if(err) {
            throw err;
        }
        res.json(rows);
    });
    console.log('Job done.')
});

app.listen(port, () => {
    console.log(`Sample app listening at http://localhost:${port}`);
});
