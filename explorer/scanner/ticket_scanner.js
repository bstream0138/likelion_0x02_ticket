 // scanner.js
 
// 주의
// const Web3 로 구현 시 error, {Web3}로 export 해야 정상 작동
 // const Web3 = require('web3');
const {Web3} = require('web3');

const fs = require('fs');
const closedEventAbi = require('../abis/ClosedEventAbi.json');


// cosnt INFURA_SEPOLIA_URL=
// const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_SEPOLIA_URL));

const web3 = new Web3(`https://sepolia.infura.io/v3/8b3f01d46b7a47429cf7e7905dfa4f91`); //ganache-cli 

const contractAddress = '0x9118ef5b862e66bfe0df7730572e35dea98e1ea7';

const contract = new web3.eth.Contract(closedEventAbi, contractAddress);

const fromBlock = 5358554; // 관심 있는 활동을 시작하는 블록 번호
const toBlock =   5358561; // 최신 블록까지 조회

// 이벤트에서 정보 추출
async function extractEventData(event) {
    // UnixTimestamp와 DateTime 변환
    const blockTimestamp = await web3.eth.getBlock(event.blockNumber).then(block => block.timestamp);
    const dateTime = new Date(Number(blockTimestamp) * 1000).toISOString();

    // 이벤트 데이터 추출
    const extractedData = {
        contractAddress: contractAddress,
        txHash: event.transactionHash,
        blockNumber: Number(event.blockNumber),
        unixTimestamp: Number(blockTimestamp),
        dateTime: dateTime,
        from: event.returnValues.from,
        to: event.returnValues.to,
        tokenId: event.returnValues.tokenId.toString(),
        // from이 0x000이면 mint
        method: event.event === 'Transfer' && event.returnValues.from === '0x0000000000000000000000000000000000000000' ? 'Mint' : 'Transfer'
    };

    return extractedData;
}

// Mint
/*
async function getMintEvents() {
    const mintTicket = await contract.getPastEvents('mintTicket', {
        fromBlock,
        toBlock
    });
    console.log(mintTicket);
    return mintTicket;
}
*/

// TransferFrom
async function getTransferFromEvents() {
    return await contract.getPastEvents('Transfer', {
        fromBlock,
        toBlock
    });
}

async function getLatestBlockNumber() {
    try {
        const lastestBlockNumber = await web3.eth.getBlockNumber();
        console.log(`Lastest block number: ${lastestBlockNumber}`)
        return lastestBlockNumber;
    } catch (error) {
        console.error(`An error occurred while fetching the lastest block number: ${error} `)
    }
}

//getLatestBlockNumber();

async function run() {
    const fileName = contractAddress.slice(0,6);
    const filePath = `../src/data/event_${fileName}.json`;
    const events = await getTransferFromEvents().catch(console.error);
    const db_data = await Promise.all(events.map(event => extractEventData(event)));
    
    fs.writeFile(filePath, JSON.stringify(db_data, null, 4), (err) => {
        if(err) {
            console.error('[error] writeFile: ', err);
        } else {
            console.log('[success] writeFile: ', filePath);
        }
    });
}

run().catch(console.error);
