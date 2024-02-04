// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
[Post-Event Ticket : 티켓의 굿즈화] - 소비자간의 소통, 우리는 소통 도우미

<주최자>
1. Post-Event 때 필요한 다양한 정보 요청
    - 특정 굿즈 거래 횟수, 거래 가격 등등(인기 굿즈 선별)

<소비자>
1. 티켓 수집
2. 2차 거래
3. 등등

<우리>
1. 소비자끼리 굿즈화된 티켓들 잘 거래 할 수 있도록 함수 혹은 플랫폼 구현
2. 주최자가 필요한 정보 제공(함수 혹은 web3 명령어 활용)
*/

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract PostTicket is ERC721Enumerable {}
