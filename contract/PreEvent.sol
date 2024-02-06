// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
[Pre-Event Ticket : 최초 발행부터 유저에게까지 + 웰컴이벤트 : Reveal] - 소비자와 우리의 소통

<주최자>
1. 주최자가 우리에게 정보 제공 : 티켓 이름, 심볼, (-수량), 그림(비포, 애프터URI) -> Constructor input
--> 총 수량을 함부로 정하는 것은 위험함. 수량은 정해놓고 하지 말것.

<소비자>
1. 충전 완료한 자체토큰으로 티켓 예매 -> 예매완료 시 '티켓 받기' 버튼 활성화 -> '티켓 받기' 클릭 시 mintTicket() 함수 실행

**** 괜찮은 방법인지? tokenId값을 totalSupply() 사용 안하는 방식은 없는지?
혹은 다른 방법이 있는지?
2. 예매 취소(환불 요청) -> '티켓 반납' 버튼 클릭 시 우리에게 티켓 전송 -> ticket owner가 우리인게 확인되면 유저에게 자체토큰 전송
    - burn()을 쓸 생각이었지만, tokenId = totalSupply() + 1; 로 해버려서 나중에 tokenId가 중복되는 상황이 발생함.
    - 그래서 반납(유저 -> 우리) 형태로 생각했음.
3. 취소된 티켓 예매
    - 반납된 티켓들을 새로운 구매자에게 전송하는 방법으로 생각함.
****
--> 환불 티켓의 tokenId를 blacklist에 올려서 모든 거래를 막기.

<우리>
1. 주최자 의뢰대로 정해진 시간에 티켓 발행(Deploy) 및 예매 종료
2. 시간에 맞춰 reveal 시키기(Pre-Event)
*/

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract PreTicket is ERC721Enumerable/*, Ownable*/ {
    string beforeURI; // 초기 발행 시 티켓 이미지 ex) 가수 사진 + 공연시간,장소 적힌 평범한 이미지
    string afterURI; // pre event용 티켓 이미지 ex) 콘서트 포스터 사진
    bool isRevealed;
    uint maxSupply;

    struct Ticket {
        address ticketOwner;
        address admin;
        // string seat;
    }

    struct User {
        address addr;
        uint ownedTokenId;
    }

    mapping(uint => Ticket) tickets; // (owner addr : tokenID)
    mapping(address => uint) users;

    constructor(string memory _name, string memory _symbol, string memory _beforeURI, string memory _afterURI, uint _maxSupply) ERC721(_name, _symbol) /*Ownable(msg.sender)*/ {
        beforeURI = _beforeURI;
        afterURI = _afterURI;
        maxSupply = _maxSupply;
        Ticket(msg.sender, msg.sender);
    }

    function batchMint(uint _amount) public {
        for(uint i = 0; i < _amount; i++) {
            mintTicket(); 
        }
    }

    // 
    function mintTicket() public {
        require(totalSupply() < maxSupply, "Can't mint over maxSupply");
        uint tokenId = totalSupply() + 1;
        _mint(msg.sender, tokenId);

        tickets[tokenId] = Ticket(msg.sender);
        users[msg.sender] = tokenId;
    }

    // function cancel() public {

    // }

    // function mintCanceledTicket() public {
    //     require(tickets[users[msg.sender]??]/*취소된 티켓의 tokenId들어가야함*/ == owner);
    //     transferFrom(owner, msg.sender, tickets[users[msg.sender]??]/*취소된 티켓의 tokenId들어가야함*/);
    // }

    function tokenURI(uint _tokenId) public view override returns(string memory) {
        if(isRevealed == false) {
            return string(abi.encodePacked(beforeURI));
        } else {
            return string(abi.encodePacked(afterURI));
        }
    }
    
    // 유저등록
}