const UniswapV2Factory = artifacts.require("UniswapV2Factory");
// const mDAI = artifacts.require("MDAI");
// const mETH = artifacts.require("METH");
// const m0x = artifacts.require("M0x");
// const pairDE = artifacts.require("UniswapV2Pair");
// const pair0E = artifacts.require("UniswapV2Pair");
// const UniswapV2Router01 = artifacts.require("UniswapV2Router01");

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    setter = accounts[0];
    //deploy the facotry
    let factoryContract = await deployer.deploy(UniswapV2Factory, setter);

    //mDAI
    // var initialSupply = 1000000000;
    // let mDAIContract = await deployer.deploy(mDAI, initialSupply);
    // //mETH
    // let mETHContract = await deployer.deploy(mETH, initialSupply);
    // //m0x
    // let m0XContract = await deployer.deploy(m0x, initialSupply);
    //
    // let routerContract = await deployer.deploy(
    //   UniswapV2Router01,
    //   mETH.address,
    //   factoryContract.address
    // );
    //
    // var allowedAmount = 1000000;
    // // await mDAIContract.approve(routerContract.address, allowedAmount);
    // // await mETHContract.approve(routerContract.address, allowedAmount);
    // // await m0XContract.approve(routerContract.address, allowedAmount);
    //
    // await factoryContract.createPair(
    //   mDAIContract.address,
    //   mETHContract.address
    // );
    // await factoryContract.createPair(m0XContract.address, mETHContract.address);
    //
    // let pairDEAddress = await factoryContract.getPair(
    //   mDAIContract.address,
    //   mETHContract.address
    // );
    // let pair0EAddress = await factoryContract.getPair(
    //   m0XContract.address,
    //   mETHContract.address
    // );
    //
    // let pairDEContract = await pairDE.at(pairDEAddress);
    // let pair0EContract = await pair0E.at(pair0EAddress);
    //
    // await mDAIContract.transfer(pairDEAddress, allowedAmount);
    // await mETHContract.transfer(pairDEAddress, allowedAmount);
    // await pairDEContract.mint(accounts[2]);
    //
    // let latestBlock = await web3.eth.getBlock("latest");
    // let now = latestBlock.timestamp;
    // let expiry = now + 3600;
    //
    // // console.log(expiry);
    // // console.log(await mETHContract.allowance(setter, routerContract.address));
    // console.log(await routerContract.factory());
    // // console.log(await routerContract.WETH());
    //
    // let a = await pairDEContract.getReserves();
    //
    // let b = a._reserve0;
    // console.log(b.toString());
    //
    // console.log(await routerContract.quote(1, 200, 200));
    // // routerContract.addLiquidity(
    // //   mDAIContract.address,
    // //   mETHContract.address,
    // //   allowedAmount,
    // //   allowedAmount,
    // //   1,
    // //   1,
    // //   accounts[2],
    // //   expiry,
    // //   { from: accounts[1], gaslimit: 900000000 }
    // // );
  });
};
