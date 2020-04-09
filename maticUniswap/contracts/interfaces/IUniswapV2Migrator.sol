pragma solidity =0.5.16;

interface IUniswapV2Migrator {
    function factoryV1() external view returns (address);
    function router() external pure returns (address);

    function migrate(address token, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external;
}
