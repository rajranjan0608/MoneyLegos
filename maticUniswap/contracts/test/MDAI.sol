pragma solidity =0.5.16;

import './CustomERC20.sol';

contract MDAI is CustomERC20 {

    constructor(uint _initialSupply) CustomERC20("mDAI","mDAI",_initialSupply) public {

    }
}
