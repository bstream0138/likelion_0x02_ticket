// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
[During-Event Ticket : 공연 중 이벤트] - 주최자와 우리의 소통

<주최자>
1. During-Event 때 필요한 다양한 정보 요청
    - 2차거래 없는 티켓 소유자들의 응원봉 색상 변경
    - 등등

<소비자>
1. 이벤트 즐기기

<우리>
1. 주최자가 필요한 정보 얻을 수 있는 함수들 구현
    - 2차 거래 없는 티켓 소유자들의 좌석 정보 제공
    - 등등
*/

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract DuringTicket is ERC721Enumerable {}
