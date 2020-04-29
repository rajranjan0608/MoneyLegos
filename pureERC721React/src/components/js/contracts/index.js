var Web3 = require("web3");
var Biconomy = require("@biconomy/mexa");
const { config } = require("./config");
let sigUtil = require("eth-sig-util");
var web3;
var contract;
var erc20Contract;
var biconomy;

const domainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" }
];

const permitType = [
  { name: "owner", type: "address" },
  { name: "spender", type: "address" },
  { name: "value", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "deadline", type: "uint256" }
];

const swapType = [
  { name: "from", type: "address" },
  { name: "amount", type: "uint256" },
  { name: "inputToken", type: "address" },
  { name: "outputToken", type: "address" },
  { name: "to", type: "address" },
  { name: "nonce", type: "uint256" },
  { name: "deadline", type: "uint256" }
];

let domainData = {
  name: "UniswapV2Router01",
  version: "1",
  verifyingContract: config.address.routerAddress
};
let domainDataERC20 = {
  version: "1",
  verifyingContract: config.contract.mDaiAddres
};

const connectWallet = async function() {
  if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
    // Ethereum user detected. You can now use the provider.
    const provider = window["ethereum"];
    await provider.enable();
    console.log(provider.networkVersion);
    var _chainId = provider.networkVersion;
    //var chainId = parseInt(_chainId);
    domainData.chainId = _chainId;
    domainDataERC20.chainId = _chainId;
    console.log(_chainId);
    web3 = new Web3(provider);
    // biconomy = new Biconomy(window.ethereum, {
    //   dappId: "5e9485402cb02156d3b4d062",
    //   apiKey: "JH7jS-1sf.58ea244a-2f5c-489b-b739-0bfe762712d3",
    //   debug: "true"
    // });
    // web3 = new Web3(biconomy);
    // biconomy
    //   .onEvent(biconomy.READY, async () => {
    //     console.log("hello");
    //     //await justTrying();
    //   })
    //   .onEvent(biconomy.ERROR, (error, message) => {
    //     console.log(error);
    //   });

    contract = new web3.eth.Contract(
      config.contract.routerAbi,
      config.address.routerAddress
    );
    //console.log(await contract.methods.getQuote().call());
    console.log(await contract.methods.WETH().call());
  }
};
const getSignatureParameters = signature => {
  if (!web3.utils.isHexStrict(signature)) {
    throw new Error(
      'Given value "'.concat(signature, '" is not a valid hex string.')
    );
  }
  var r = signature.slice(0, 66);
  var s = "0x".concat(signature.slice(66, 130));
  var v = "0x".concat(signature.slice(130, 132));
  v = web3.utils.hexToNumber(v);
  if (![27, 28].includes(v)) v += 27;
  return {
    r: r,
    s: s,
    v: v
  };
};

const sendSwapTransaction = async (
  from,
  amount,
  inputToken,
  outputToken,
  to,
  deadline,
  v,
  r,
  s
) => {
  if (web3 && contract) {
    let gasLimit = await contract.methods
      .swap(from, amount, inputToken, outputToken, to, deadline, v, r, s)
      .estimateGas({ from: from });
    let gasPrice = await web3.eth.getGasPrice();
    let tx = contract.methods
      .swap(from, amount, inputToken, outputToken, to, deadline, v, r, s)
      .send({
        from: from,
        gasLimit: gasLimit,
        gasPrice: gasPrice
      });

    tx.on("transactionHash", function(hash) {
      console.log(`Transaction hash is ${hash}`);
    }).once("confirmation", function(confirmationNumber, receipt) {
      console.log(receipt);
    });
  }
};

const sendPermitTransaction = async (
  owner,
  spender,
  value,
  deadline,
  v,
  r,
  s
) => {
  if (web3 && erc20Contract) {
    try {
      console.log("hi::::::::::");
      let gasLimit = await erc20Contract.methods
        .permit(owner, spender, value, deadline, v, r, s)
        .estimateGas({ from: owner });
      let gasPrice = await web3.eth.getGasPrice();
      console.log(gasLimit);
      console.log(gasPrice);
      let tx = erc20Contract.methods
        .permit(owner, spender, value, deadline, v, r, s)
        .send({
          from: owner,
          gasPrice: web3.utils.toHex(gasPrice),
          gasLimit: web3.utils.toHex(gasLimit)
        });

      tx.on("transactionHash", function(hash) {
        console.log(`Transaction hash is ${hash}`);
      }).once("confirmation", function(confirmationNumber, receipt) {
        console.log(receipt);
      });
    } catch (error) {
      console.log(error);
    }
  }
};
const getNow = async function() {
  var latestBlock = await web3.eth.getBlock("latest");
  var now = latestBlock.timestamp;
  return parseInt(now);
};

export const swap = async function(from, amount, inputToken, outputToken, to) {
  let userAddress = window.ethereum.selectedAddress;
  var now = await getNow();
  var deadline = now + 60 * 60;
  let nonce = await contract.methods.nonces(userAddress).call();

  let message = {};
  message.from = userAddress;
  message.amount = amount;
  message.inputToken = inputToken;
  message.outputToken = outputToken;
  message.to = to;
  message.nonce = parseInt(nonce);
  message.deadline = deadline;

  const dataToSign = {
    types: {
      EIP712Domain: domainType,
      Swap: swapType
    },
    domain: domainData,
    primaryType: "Swap",
    message: message
  };
  const sigString = JSON.stringify(dataToSign);
  console.log(dataToSign);

  web3.currentProvider.send(
    {
      jsonrpc: "2.0",
      id: 999999999999,
      method: "eth_signTypedData_v4",
      params: [userAddress, sigString]
    },
    function(error, response) {
      console.log(response);
      console.log(userAddress);
      console.log(JSON.stringify(message));
      console.log(message);
      console.log(getSignatureParameters(response.result));
      let { r, s, v } = getSignatureParameters(response.result);
      const recovered = sigUtil.recoverTypedSignature_v4({
        data: JSON.parse(sigString),
        sig: response.result
      });
      console.log("recover:" + recovered);
      sendSwapTransaction(
        from,
        amount,
        inputToken,
        outputToken,
        to,
        deadline,
        v,
        r,
        s
      );
    }
  );
};

export const getPermit = async function(token, value) {
  erc20Contract = new web3.eth.Contract(
    config.contract.erc20Abi,
    config.address[token]
  );
  console.log(config.address[token]);
  console.log(erc20Contract);
  let message = {};
  var userAddress = window.ethereum.selectedAddress;
  var owner = userAddress;
  var spender = config.address.routerAddress;
  var now = await getNow();
  var deadline = now + 60 * 60;
  var nonce = await erc20Contract.methods.nonces(userAddress).call();

  message.owner = userAddress;
  message.spender = spender;
  message.value = value;
  message.nonce = parseInt(nonce);
  message.deadline = deadline;

  domainDataERC20.name = token;
  domainDataERC20.verifyingContract = config.address[token];

  const dataToSign = {
    types: {
      EIP712Domain: domainType,
      Permit: permitType
    },
    domain: domainDataERC20,
    primaryType: "Permit",
    message: message
  };
  const sigString = JSON.stringify(dataToSign);
  console.log(dataToSign);

  web3.currentProvider.send(
    {
      jsonrpc: "2.0",
      id: 999999999999,
      method: "eth_signTypedData_v4",
      params: [userAddress, sigString]
    },
    function(error, response) {
      console.log(response);
      let { r, s, v } = getSignatureParameters(response.result);
      sendPermitTransaction(owner, spender, value, deadline, v, r, s);
    }
  );
};
const getAmountOut = async function(
  inputAmount,
  inputTokenName,
  outputTokenName
) {
  if (web3 && contract) {
    let path = [
      config.address[inputTokenName],
      config.address[outputTokenName]
    ];
    let amountsOut = await contract.methods
      .getAmountsOut(inputAmount, path)
      .call();
    return amountsOut[1];
  } else {
    alert("connectWallet first");
  }
};
function getAmountWithDecimals(_tokenAmount) {
  var decimals = web3.utils.toBN(18);
  var tokenAmount = web3.utils.toBN(_tokenAmount);
  var tokenAmountHex = tokenAmount.mul(web3.utils.toBN(10).pow(decimals));

  return web3.utils.toHex(tokenAmountHex);
}
// const addLiquidity(token1Name,token2Name,)
const mint = async function(token) {
  erc20Contract = new web3.eth.Contract(
    config.contract.erc20Abi,
    config.address[token]
  );
  let amountToMint = getAmountWithDecimals(1000);
  console.log(amountToMint);
  await erc20Contract.methods
    .mint(amountToMint)
    .send({ from: window.ethereum.selectedAddress });
};
const init = async function() {
  await connectWallet();
  
  // await mint("mDAI");
  // let amountOut = await getAmountOut(100, "mBTC", "MANA");
  // console.log(amountOut);
  //  await getPermit("mDAI", 1000000000000);
  //
  // //
  // await swap(
  //   window.ethereum.selectedAddress,
  //   200,
  //   config.address["mDAI"],
  //   config.address["mBTC"],
  //   "0x5f74c8b427ffa7464B7A0dAa15bbEcA28853a812"
  // );
};
//init();
init();
