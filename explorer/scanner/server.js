const fs = require('fs');
const path = require('path');
const axios = require('axios');
const mysql = require('mysql2/promise');
require('dotenv').config();


const mariaDB = mysql.createPool(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    }
);

async function insertEventDataFromJSON(contractAddress) {
    const fileName = `event_${contractAddress.slice(0,6)}.json`;

    try {
        const rawData = fs.readFileSync(fileName);
        const events = JSON.parse(rawData);

        for (const event of events) {
            const _query = `
                INSERT INTO concert_events
                (contractAddress, txHash, blockNumber, unixTimestamp, dateTime, fromAddress, toAddress, tokenId, method)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            const {contractAddress, txHash, blockNumber, unixTimestamp, dateTime, from, to, tokenId, method} = event;

            const result = await mariaDB.query(_query, [contractAddress, txHash, blockNumber, unixTimestamp, dateTime, from, to, tokenId, method]);
            console.log(`Inserted event ${result[0].insertId} successfully.`);
        }
    } catch (err) {
        console.error(err);
    }
}

// 사용 예
const contractAddress = '0x9118ef5b862e66bfe0df7730572e35dea98e1ea7';
insertEventDataFromJSON(contractAddress).catch(console.error);