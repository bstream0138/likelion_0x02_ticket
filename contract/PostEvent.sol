// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// collection 역할의 Post-Ticket
contract PostTicket is ERC721Enumerable, Ownable {
    string musician;
    string metadataURI; 

    constructor(string memory _name, string memory _symbol, string memory _metadataURI) ERC721(_name, _symbol) Ownable(msg.sender) {
        musician = _name;
        metadataURI = _metadataURI;
    }

    // 티켓 발급, 가스비 사용하므로 admin만 실행 가능
    function mintTicket(address _addr, uint _tokenId) public onlyOwner {
        _mint(_addr, _tokenId);
    }
 
    // 조건 추가하여 common, rare, unique 등급으로 나눔, 나중에 진짜 랜덤 조건으로 수정 필요
    function tokenURI(uint _tokenId) public view override returns(string memory) {
        if(_tokenId % 6 == 0) {
            return string(abi.encodePacked(metadataURI, '/', musician, '_Unique.json'));
        } else if(_tokenId % 6 == 3 || _tokenId % 6 == 5) {
            return string(abi.encodePacked(metadataURI, '/', musician, '_Rare.json'));
        } else {
            return string(abi.encodePacked(metadataURI, '/', musician, '_Common.json'));
        }
    }
}