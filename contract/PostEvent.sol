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

contract PostTicket is ERC721Enumerable {
    string beforeURI; // ex) 감사 이미지, 가수 셀카 등등
    string afterURI; // ex) 굿즈 이미지 등, 예정된 팬미팅 포스터 등등 
    bool isRevealed;

    constructor(string memory _name, string memory _symbol, string memory _beforeURI, string memory _afterURI) ERC721(_name, _symbol) {
        beforeURI = _beforeURI;
        afterURI = _afterURI;
    }

    // 티켓 발급
    function mintTicket(address _addr) public {
        uint tokenId = totalSupply() + 1;
        _mint(_addr, tokenId);
    }

    function setStatus() public {
        isRevealed = !isRevealed;
    }

    function tokenURI(uint _tokenId) public view override returns(string memory) {
        if(!isRevealed) {
            return string(abi.encodePacked(beforeURI));
        } else {
            return string(abi.encodePacked(afterURI));
        }
    }
}