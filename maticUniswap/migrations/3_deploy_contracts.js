const UniswapV2Factory = artifacts.require("UniswapV2Factory");
const util = require("util");
// const ERC20 = artifacts.require("ERC20");
const mDAI = artifacts.require("MDAI");
const mETH = artifacts.require("METH");
const m0x = artifacts.require("M0x");
const pairDE = artifacts.require("UniswapV2Pair");
const pair0E = artifacts.require("UniswapV2Pair");
const UniswapV2Router01Gasless = artifacts.require("UniswapV2Router01Gasless");
//
module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    setter = accounts[0];
    //get the deployed  facotry
    let factoryContract = await UniswapV2Factory.deployed();

    // let networkID = (await util.promisify(web3.currentProvider.sendAsync, {
    //   jsonrpc: "2.0",
    //   method: "net_version",
    //   params: [],
    //   id: 0
    // })).result;
    // console.log(networkID);

    //  var chainId;
    async function getNetID() {
      return new Promise(function(resolve, reject) {
        web3.providers.HttpProvider.prototype.sendAsync =
          web3.providers.HttpProvider.prototype.send;

        web3.currentProvider.sendAsync(
          {
            jsonrpc: "2.0",
            method: "net_version",
            params: [],
            id: 0
          },
          function(err, result) {
            if (err) {
              console.error(err.message);
              reject(err);
            } else {
              resolve(result.result);
            }
          }
        );
      });
    }
    // console.log(await getNetID());
    // web3.providers.HttpProvider.prototype.sendAsync =
    //   web3.providers.HttpProvider.prototype.send;
    //
    // web3.currentProvider.sendAsync(
    //   {
    //     jsonrpc: "2.0",
    //     method: "net_version",
    //     params: [],
    //     id: 0
    //   },
    //   function(err, result) {
    //     if (err) {
    //       return console.error(err);
    //     }
    //     chainId = result.result;
    //   }
    // );
    // chaiId = process.env.NETWORK;
    // console.log(chaiId);
    let chainId = await getNetID();

    // async function getAmountWithDecimals(_tokenAmount) {
    //   var decimals = web3.utils.toBN(18);
    //   var tokenAmount = web3.utils.toBN(_tokenAmount);
    //   var tokenAmountHex =
    //     "0x" +
    //     tokenAmount.mul(web3.utils.toBN(10).pow(decimals)).toString("hex");
    //   let encodedParameter = await web3.eth.abi.encodeParameter(
    //     "uint",
    //     tokenAmountHex
    //   );
    //   return encodedParameter;
    // }
    function getAmountWithDecimals(_tokenAmount) {
      var decimals = web3.utils.toBN(18);
      var tokenAmount = web3.utils.toBN(_tokenAmount);
      var tokenAmountHex = tokenAmount.mul(web3.utils.toBN(10).pow(decimals));

      return web3.utils.toHex(tokenAmountHex);
    }
    var initialSupply = getAmountWithDecimals(1000000);
    //  console.log(initialSupply.toString());

    let mDAIContract = await deployer.deploy(mDAI, initialSupply, chainId);

    // let a = await mDAIContract.balanceOf(setter);
    // console.log(a.toString());
    //mETH
    let mETHContract = await deployer.deploy(mETH, initialSupply, chainId);
    //m0x
    let m0XContract = await deployer.deploy(m0x, initialSupply, chainId);
    //mDAI

    //let ERC20Contarct = await deloyer.deploy(ERC20, initialSupply);

    //
    let routerContract = await deployer.deploy(
      UniswapV2Router01Gasless,
      mETH.address,
      factoryContract.address,
      chainId
    );
    //
    var liquidityAmount = getAmountWithDecimals(10000);
    await mDAIContract.approve(routerContract.address, liquidityAmount);
    await mETHContract.approve(routerContract.address, liquidityAmount);

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
    // // await mDAIContract.transfer(pairDEAddress, allowedAmount);
    // // await mETHContract.transfer(pairDEAddress, allowedAmount);
    // // await pairDEContract.mint(accounts[2]);
    //
    let latestBlock = await web3.eth.getBlock("latest");
    let now = latestBlock.timestamp;
    let expiry = now + 3600;

    // console.log(expiry);
    // console.log(await mETHContract.allowance(setter, routerContract.address));
    // console.log(await routerContract.factory());
    // // console.log(await routerContract.WETH());
    //
    // let a = await pairDEContract.getReserves();
    //
    // let b = a._reserve0;
    // console.log(b.toString());
    await routerContract.addLiquidity(
      mDAIContract.address,
      mETHContract.address,
      liquidityAmount,
      liquidityAmount,
      1,
      1,
      setter,
      expiry
    );
    await mETHContract.approve(routerContract.address, liquidityAmount);
    await m0XContract.approve(routerContract.address, liquidityAmount);

    await routerContract.addLiquidity(
      m0XContract.address,
      mETHContract.address,
      liquidityAmount,
      liquidityAmount,
      1,
      1,
      setter,
      expiry
    );
    var swapAmount = getAmountWithDecimals(10);
    await mDAIContract.approve(routerContract.address, swapAmount);
    var path = [mDAIContract.address, mETHContract.address];

    let amountOutMin = await routerContract.getAmountsOut(swapAmount, path);
    console.log(amountOutMin[1].toString());
    await routerContract.swapExactTokensForTokens(
      swapAmount,
      web3.utils.toHex(amountOutMin[1]),
      path,
      setter,
      expiry
    );
    let a = await mETHContract.balanceOf(setter);
    console.log(a.toString());
  });
};
