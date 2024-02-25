// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// my ticket 역할의 Pre-Ticket
contract PreTicket is ERC721Enumerable, Ownable {
    string musician;
    string metadataURI;
    bool isRevealed;

    // 환불리스트, 입장리스트 (tokenId => bool)
    mapping(uint => bool) internal isCanceledTicket;
    mapping(uint => bool) internal isEnteredTicket;
    
    // 입장여부 확인 modifier, 입장한 티켓이라면 error
    modifier notEntered(uint _tokenId) {
        require(!isEnteredTicket[_tokenId], "This is already entered ticket");
        _;
    }

    // 환불여부 확인 modifier, 환불된 티켓이라면 error
    modifier notCanceled(uint _tokenId) {
        require(!isCanceledTicket[_tokenId], "This is canceled ticket");
        _;
    }

    // 주최자의 의뢰대로 인풋값 입력, admin = 배포자
    constructor(string memory _name, string memory _symbol, string memory _metadataURI) ERC721(_name, _symbol) Ownable(msg.sender) {
        musician = _name;
        metadataURI = _metadataURI;
    }

    // 티켓 발급 : admin만 원하는 address로 민팅, 가스비 사용하므로 admin만 실행 가능
    function mintTicket(address _addr) external onlyOwner {
        require(!isRevealed, "Can not mint after revealed");
        uint tokenId = totalSupply() + 1;
        _mint(_addr, tokenId);
    }

    // 리빌 : 웰컴메시지 역할, 정해진 시간에만 입장 가능하게끔(추가설명은 아래 enter 함수로..), 가스비 사용하므로 admin만 실행 가능
    function reveal() external onlyOwner {
        isRevealed = true;
    }

    // 입장 : 웰컴메시지를 받은(=reveal이 된) 티켓만 입장 가능, 가스비 사용하므로 admin만 실행 가능
    function enter(uint _tokenId) external onlyOwner notCanceled(_tokenId) notEntered(_tokenId) {
        require(isRevealed, "Ticket is not revealed yet");
        isEnteredTicket[_tokenId] = true;
    }

    // 환불 : 해당 tokenId를 가진 티켓 취소 후 티켓 소각, 가스비 사용하므로 admin만 실행 가능
    function cancel(uint _tokenId) external onlyOwner notCanceled(_tokenId) notEntered(_tokenId) {
        isCanceledTicket[_tokenId] = true;
        // _burn(_tokenId);
    }

    // 환불과 함께 바로 소각 할 것인지(환불완료 그림 확인 불가), 환불과 소각을 따로 둘 것인지(환불완료 그림 확인 가능)
    // + ticket -> collection 이동 시 pre-ticket을 소각할 것인지, 단순하게 안보이게 할 것인지
    function burnTicket(uint _tokenId) external onlyOwner {
        _burn(_tokenId);
    }

    // 입장한 티켓인지 tokenId로 확인
    function isEntered(uint _tokenId) external view returns(bool) {
        return isEnteredTicket[_tokenId];
    }

    // 취소된 티켓인지 tokenId로 확인
    function isCanceled(uint _tokenId) external view returns(bool) {
        return isCanceledTicket[_tokenId];
    }

    // 각 상황에 맞게 총 4가지 URI(before, after, entered, canceled)
    function tokenURI(uint _tokenId) public view override returns(string memory) {
        if(!isRevealed && !isEnteredTicket[_tokenId] && !isCanceledTicket[_tokenId]) {
            return string(abi.encodePacked(metadataURI, '/', musician, '_Before.json'));
        } else if(isRevealed && !isEnteredTicket[_tokenId] && !isCanceledTicket[_tokenId]) {
            return string(abi.encodePacked(metadataURI, '/', musician, '_After.json'));
        } else if(isRevealed && isEnteredTicket[_tokenId] && !isCanceledTicket[_tokenId]) {
            return string(abi.encodePacked(metadataURI, '/', musician, '_Entered.json'));
        } else {
            return string(abi.encodePacked(metadataURI, '/', musician, '_Canceled.json'));
        }
    }
}