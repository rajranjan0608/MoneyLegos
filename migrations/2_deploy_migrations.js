const UniswapV2Router01Gaseless = artifacts.require(
  "UniswapV2Router01Gaseless"
);

module.exports = function(deployer) {
  var WETH = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
  deployer.deploy(UniswapV2Router01Gaseless, WETH);
};
