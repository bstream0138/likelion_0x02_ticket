// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract CanceledTicket is Ownable {
    mapping(uint => bool) internal isCanceledTicket;

    event Canceled(uint indexed _tokenId);
    event UnCanceled(uint indexed _tokenId);

    modifier notCanceled(uint _tokenId) {
        require(!isCanceledTicket[_tokenId], "CanceledTicket: ticket is canceled");
        _;
    }

    // 취소된 티켓인지 tokenId로 확인
    function isCanceled(uint _tokenId) external view returns(bool) {
        return isCanceledTicket[_tokenId];
    }

    // 해당 tokenId를 가진 티켓 취소
    function cancel(uint _tokenId) external onlyOwner {
        isCanceledTicket[_tokenId] = true;
        emit Canceled(_tokenId);
    }

    // 해당 tokenId를 가진 취소된 티켓 다시 복구
    function unCancel(uint _tokenId) external onlyOwner {
        isCanceledTicket[_tokenId] = false;
        emit UnCanceled(_tokenId);
    }
}