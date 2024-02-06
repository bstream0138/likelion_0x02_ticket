// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
[자체토큰] : 토큰은 관리자만 발행 가능

<소비자>
1. 현금으로 우리에게 결제

<우리>
1. 소비자 결제 금액 확인 후 토큰 전송
*/

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 그냥 이렇게 해도 문제 없는지?
contract T02token is ERC20("T02Token", "T02") {
    constructor(uint _amount) {
         _mint(msg.sender, _amount * 10 ** decimals());
    }
}

// 관리자만 발행 가능하도록
contract T02token2 is ERC20("T02Token", "T02") {
    address admin;

    constructor() {
        admin = msg.sender;
    }

    function mintToken(address _addr, uint _amount) public {
        require(msg.sender == admin, "Admin Only");
        _mint(_addr, _amount * 10 ** decimals());
    }
}