# likelione_0x02_ticket

![NFT-Ticketing-Platform](./readme_assets/DALLE_20240129_NFT ticketing platform.png)


## Table of Contents
- [About the Project](#about-the-project)
    - [Use cases](#use-cases)
    - [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Smart Contracts](#smart-contracts)
    - [Frontend](#frontend)
    - [Local development](#local-development)

## About the Project
About the project

### Use cases :
- Users 

### Architecture:
- Local blockchain development : [Ganache](https://www.trufflesuite.com/ganache)
- Smart contracts development : [Truffle](https://www.trufflesuite.com/truffle)
- Decentralized File Storage : [IPFS](https://ipfs.io/)
- Frontend library : [React](https://reactjs.org/)
- Interaction with Ehtereum node : [Web3.js](https://web3js.readthedocs.io/en/v1.5.2/#)
- Crypto wallet for transactions : [Metamask](https://metamask.io/)


## Directory Structure
- `client`: Project's React frontend.
- `contracts`: Smart contracts that are deployed in the Ropsten testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.

## Installation

### Prerequisites

- Install [Node.js >= v14](https://nodejs.org/en/download/)
- Install [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation) and [Ganache](https://www.trufflesuite.com/ganache)

### Smart Contracts

- Run `npm install` in project root to install Truffle build and smart contract dependencies
- Run local testnet in port `7545` with an Ethereum client, e.g. Ganache
- `truffle migrate --network development`
- `truffle console --network development`

### Frontend

- `cd client`
- `npm install`
- `npm start run`
- Open `http://localhost:3000`

### Local development

- `truffle migrate --network development`
- `truffle console --network development`

