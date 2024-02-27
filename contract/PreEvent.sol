// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// my ticket 역할의 Pre-Ticket
contract PreTicket is ERC721Enumerable, Ownable {
    string musician;
    string metadataURI;
    // bool isRevealed; // 시연용 주석처리

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
        // require(!isRevealed, "Can not mint after revealed"); // 시연용 주석처리
        uint tokenId = totalSupply() + 1;
        _mint(_addr, tokenId);
    }

    /* 시연 편의성 위해 주석 처리
    // 리빌(before -> after) : 웰컴메시지 역할, 정해진 시간에만 입장 가능하게끔(추가설명은 아래 enter 함수로..), 가스비 사용하므로 admin만 실행 가능
    function reveal() external onlyOwner {
        isRevealed = true;
    }
    */

    // 입장(after -> entered) : 웰컴메시지를 받은(=reveal이 된) 티켓만 입장 가능, 가스비 사용하므로 admin만 실행 가능
    function enter(uint _tokenId) external onlyOwner notCanceled(_tokenId) notEntered(_tokenId) {
        // require(isRevealed, "Ticket is not revealed yet"); // 시연용 주석처리
        isEnteredTicket[_tokenId] = true;
    }

    // 환불(before/after -> canceled) : 해당 tokenId를 가진 티켓 취소, 가스비 사용하므로 admin만 실행 가능
    function cancel(uint _tokenId) external onlyOwner notCanceled(_tokenId) notEntered(_tokenId) {
        isCanceledTicket[_tokenId] = true;
    }

    // 소각 : 사용 불가한 티켓(입장 완료 후, 환불 완료 후) 삭제
    function burnTicket(uint _tokenId) external onlyOwner {
        require(isEnteredTicket[_tokenId] || isCanceledTicket[_tokenId], "Can not burn before entered or canceled");
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

    // 전송 : 환불 또는 입장 완료된 티켓 전송(2차 거래) 불가
    function transferFrom(address from, address to, uint256 _tokenId) public override(ERC721, IERC721) notCanceled(_tokenId) notEntered(_tokenId) {
        if (to == address(0)) {
            revert ERC721InvalidReceiver(address(0));
        }
        address previousOwner = _update(to, _tokenId, _msgSender());
        if (previousOwner != from) {
            revert ERC721IncorrectOwner(from, _tokenId, previousOwner);
        }
    }

    // 각 상황에 맞게 총 4가지 URI(before, after, entered, canceled)
    function tokenURI(uint _tokenId) public view override returns(string memory) {
        if(/*!isRevealed &&*/ !isEnteredTicket[_tokenId] && !isCanceledTicket[_tokenId]) {
            return string(abi.encodePacked(metadataURI, '/', musician, '_Before.json'));
        } /*else if(isRevealed && !isEnteredTicket[_tokenId] && !isCanceledTicket[_tokenId]) {
            return string(abi.encodePacked(metadataURI, '/', musician, '_After.json'));
        }*/ else if(/*isRevealed &&*/ isEnteredTicket[_tokenId] && !isCanceledTicket[_tokenId]) {
            return string(abi.encodePacked(metadataURI, '/', musician, '_Entered.json'));
        } else {
            return string(abi.encodePacked(metadataURI, '/', musician, '_Canceled.json'));
        }
    }
}