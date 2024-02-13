// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
[Pre-Event Ticket : 최초 발행부터 유저에게까지 + 웰컴이벤트 : Reveal] - 소비자와 우리의 소통

<주최자>
1. 주최자가 우리에게 정보 제공 : 티켓 이름, 심볼, 그림(비포, 애프터URI) -> Constructor input
--> 총 수량을 함부로 정하는 것은 위험함. 수량은 정하지 말 것.

<소비자>
1. 충전 완료한 자체토큰으로 티켓 예매 -> 예매완료 시 '티켓 받기' 버튼 활성화 -> '티켓 받기' 클릭 시 우리가 mintTicket() 함수 실행

2. 예매 취소(환불 요청) -> 환불처리가 완료된 티켓의 tokenId를 blacklist에 넣기(blacklist에 올린 티켓은 모든 거래 불가)

<우리>
1. 주최자 의뢰대로 정해진 시간에 티켓 발행(Deploy) 및 예매 종료
2. 시간에 맞춰 reveal 시키기(Pre-Event)
*/

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./CanceledTicket.sol";

contract PreTicket is ERC721Enumerable, Ownable {
    string beforeURI; // 초기 발행 시 티켓 이미지 ex) 가수 사진 + 공연시간,장소 적힌 평범한 이미지
    string afterURI; // pre event용 티켓 이미지 ex) 콘서트 포스터 사진
    bool isRevealed;

    constructor(string memory _name, string memory _symbol, string memory _beforeURI, string memory _afterURI) ERC721(_name, _symbol) Ownable(msg.sender) {
        beforeURI = _beforeURI;
        afterURI = _afterURI;
    }

    // 티켓 발급
    function mintTicket(address _addr) public onlyOwner {
        uint tokenId = totalSupply() + 1;
        _mint(_addr, tokenId);
    }

    function reveal() public onlyOwner {
        isRevealed = true;
    }

    function tokenURI(uint _tokenId) public view override returns(string memory) {
        if(!isRevealed) {
            return string(abi.encodePacked(beforeURI));
        } else {
            return string(abi.encodePacked(afterURI));
        }
    }
    
    // 유저등록
}