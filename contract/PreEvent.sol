// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
[Pre-Event Ticket : 최초 발행부터 유저에게까지 + 웰컴이벤트 : Reveal] - 소비자와 우리의 소통

<주최자>
1. 주최자가 우리에게 정보 제공 : 티켓 이름, 심볼, 수량, 그림(비포, 애프터URI) -> Constructor input

<소비자>
1. 충전 완료한 자체토큰으로 티켓 예매 -> 예매완료 시 '티켓 받기' 버튼 활성화 -> '티켓 받기' 클릭 시 mintTicket() 함수 실행
2. 예매 취소 -> '티켓 반납' 버튼 클릭 시 우리에게 티켓 전송 -> ticket owner가 우리인게 확인되면 유저에게 자체토큰 전송
***3. 취소된 티켓 예매 -> ??***

<우리>
1. 주최자 의뢰대로 정해진 시간에 티켓 발행(Deploy) 및 예매 종료
2. 시간에 맞춰 reveal 시키기(Pre-Event)
*/

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PreTicket is ERC721Enumerable, Ownable {
    string beforeURI; // 초기 발행 시 티켓 이미지 ex) 가수 사진 + 공연시간,장소 적힌 평범한 이미지
    string afterURI; // pre event용 티켓 이미지 ex) 콘서트 포스터 사진
    bool isRevealed;
    uint maxSupply;

    struct Ticket {
        address ticketOwner;
        // string seat;    
    }

    struct User {
        address addr;
        uint ownedTokenId;
    }

    mapping(uint => Ticket) tickets; // (owner addr : tokenID)
    mapping(address => uint) users;

    constructor(string memory _name, string memory _symbol, string memory _beforeURI, string memory _afterURI, uint _maxSupply) ERC721(_name, _symbol) Ownable(payable(msg.sender)) {
        beforeURI = _beforeURI;
        afterURI = _afterURI;
        maxSupply = _maxSupply;
    }

    function mintTicket() public {
        require(totalSupply() < maxSupply, "Can't mint over maxSupply");
        uint tokenId = totalSupply() + 1;
        _mint(msg.sender, tokenId);

        tickets[tokenId] = Ticket(msg.sender);
        users[msg.sender] = tokenId;
    }

    function cancle() public {

    }

    function mintCancledTicket() public {
        require(tickets[users[msg.sender]??]/*취소된 티켓의 tokenId들어가야함*/ == owner);
        transferFrom(owner, msg.sender, tickets[users[msg.sender]??]/*취소된 티켓의 tokenId들어가야함*/);
    }

    function tokenURI(uint _tokenId) public view override returns(string memory) {
        if(isRevealed == false) {
            return string(abi.encodePacked(beforeURI));
        } else {
            return string(abi.encodePacked(afterURI));
        }
    }
    
    // 유저등록
}

