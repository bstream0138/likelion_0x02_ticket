 // scanner.js

// 주의
// const Web3 로 구현 시 error, {Web3}로 export 해야 정상 작동
 // const Web3 = require('web3');
 const {Web3} = require('web3');


// cosnt INFURA_SEPOLIA_URL=
// const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_SEPOLIA_URL));

const web3 = new Web3(`http://localhost:8545`); //ganache-cli 

async function getLatestBlockNumber() {
    try {
        const lastestBlockNumber = await web3.eth.getBlockNumber();
        console.log(`Lastest block number: ${lastestBlockNumber}`)
    } catch (error) {
        console.error(`An error occurred while fetching the lastest block number: ${error} `)
    }
}

getLatestBlockNumber();
