var Web3 = require("web3");
var Biconomy = require("@biconomy/mexa");
var routerAddress = "0x3487CC1802E2f7E5609980CA6F067000091dE83F";
var mDAIAddress = "0x2e3adAeA6B619f593773D3b3eF2334BeeAE209F1";
var mETHAddress = "0xf9FC9DE2C5d24a584979fA5A398A9fBE8E83B1Cc";
var m0xAddress = "0xf0ec9939A410Bb423c93bff293E2b9DE66B88e3A";
var factory = "0x53AFac73d8801874De56031F4bfea0499e0d2aCe";

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

function getDomainData(
  contractName,
  signatureVersion,
  chainId,
  contractAddress
) {
  return {
    name: contractName,
    version: signatureVersion,
    chainId: chainId,
    verifyingContract: contractAddress
  };
}
const domains = {};
domains.getDaiDomainData = function(contractAddress, chainId) {
  return getDomainData(
    "UniswapV2Router01Gasless",
    "1",
    chainId,
    contractAddress
  );
};
//console.log(domains.getDomainData("0x214sdflj"));
const schemas = {};

//The schema of every contract that supports EIP712Domain

schemas.domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" }
];
schemas.MetaTransaction = [
  { name: "nonce", type: "uint256" },
  { name: "from", type: "address" },
  { name: "functionSignature", type: "bytes" }
];

// const getPermi\Message = function(owner , spender, nonce , expiry , allowed){
//   return {
//     owner: owner,
//     spender: spender,
//     nonce : nonce,
//     expiry: expiry,
//     allowed: allowed
//   }
// }
const generators = {};

function getRequestData(
  domainDataFn,
  contractAddress,
  chainId,
  messageTypeName,
  messageSchema,
  message
) {
  const domainData = domainDataFn(contractAddress, chainId);
  // console.log("domainData:"+ JSON.stringify(domainData));
  // console.log("DOMAIN_SEPARATOR: " + web3.utils.sha3(JSON.stringify(domainData)));
  const types = {
    EIP712Domain: schemas.domain
  };
  types[messageTypeName] = messageSchema;
  return {
    types: types,
    domain: domainData,
    primaryType: messageTypeName,
    message: message
  };
}

generators.getMetaTransaction = function(
  contractAddres,
  chainId,
  nonce,
  from,
  functionSignature
) {
  const message = {
    nonce: nonce,
    from: from,
    functionSignature: functionSignature
  };
  return getRequestData(
    domains.getDaiDomainData,
    contractAddres,
    chainId,
    "MetaTransaction",
    schemas.MetaTransaction,
    message
  );
};

// var jsonInterfaceOfbiconomyTry = {
//   name: "biconomyTry",
//   type: "function",
//   inputs: [
//     {
//       internalType: "uint256",
//       name: "_a",
//       type: "uint256"
//     },
//     {
//       internalType: "address",
//       name: "_b",
//       type: "address"
//     }
//   ]
// };
var jsonInterFaceOfquote = {
  name: "quote",
  type: "function",
  inputs: [
    {
      internalType: "uint256",
      name: "amountA",
      type: "uint256"
    },
    {
      internalType: "uint256",
      name: "reserveA",
      type: "uint256"
    },
    {
      internalType: "uint256",
      name: "reserveB",
      type: "uint256"
    }
  ]
};
var jsonInterFaceOfgetAmountsOut = {
  name: "getAmountsOut",
  type: "function",
  inputs: [
    {
      internalType: "uint256",
      name: "amountIn",
      type: "uint256"
    },
    {
      internalType: "address[]",
      name: "path",
      type: "address[]"
    }
  ]
};
var jsonInterFaceOfSwapExactTokensForTokens = {
  name: "swapExactTokensForTokens",
  type: "function",
  inputs: [
    {
      internalType: "uint256",
      name: "amountIn",
      type: "uint256"
    },
    {
      internalType: "uint256",
      name: "amountOutMin",
      type: "uint256"
    },
    {
      internalType: "address[]",
      name: "path",
      type: "address[]"
    },
    {
      internalType: "address",
      name: "to",
      type: "address"
    },
    {
      internalType: "uint256",
      name: "deadline",
      type: "uint256"
    }
  ]
};
const justTrying = async () => {
  var contractAbi = gaslessRouterAbi;
  const contract = new web3.eth.Contract(contractAbi, routerAddress);
  var amountA = 1000;
  // var reserveA;
  // var reserveB;
  var daiAddress = mDAIAddress;
  var WETHAddress = mETHAddress;
  var path = [daiAddress, WETHAddress];

  var reserveA = 200;
  var reserveB = 200;

  var quoteFunctionSignature = web3.eth.abi.encodeFunctionCall(
    jsonInterFaceOfquote,
    [amountA, reserveA, reserveB]
  );
  // var getAmountOutFunctionSignature = web3.eth.abi.encodeFunctionCall(
  //   jsonInterFaceOfgetAmountsOut,
  //   [amountA, path]
  // );

  // let WETHAddress = await contract.methods.WETH().call();
  let accounts = await web3.eth.getAccounts();
  let signer = accounts[0];
  let chainId = await web3.eth.net.getId();
  console.log(chainId);
  let nonce = await contract.methods.getNonce(signer).call();

  let signatureData = generators.getMetaTransaction(
    contractAddress,
    chainId,
    nonce,
    signer,
    quoteFunctionSignature
  );
  let sigString = JSON.stringify(signatureData);

  web3.providers.HttpProvider.prototype.sendAsync =
    web3.providers.HttpProvider.prototype.send;
  web3.currentProvider.sendAsync(
    {
      method: "eth_signTypedData_v4",
      params: [signer, sigString],
      from: signer
    },
    function(err, result) {
      if (err) {
        return console.error(err);
      }
      console.log(result);
      const signature = result.result.substring(2);
      const sigR = "0x" + signature.substring(0, 64);
      const sigS = "0x" + signature.substring(64, 128);
      const sigV = parseInt(signature.substring(128, 130), 16);

      contract.methods
        .executeMetaTransaction(
          signer,
          quoteFunctionSignature,
          sigR,
          sigS,
          sigV
        )
        .send({ from: signer }, (err, res) => {
          if (err) console.log(err);
          else console.log(res);
        });
    }
  );

  // let fs = web3.eth.abi.encodeFunctionCall(jsonInterfaceOfbiconomyTry, [
  //   18,
  //   "0x208295274e99C03fbd2BA0773c40fcdCF99E1803"
  // ]);

  // console.log(fs);
  // console.log(WETHAddress);
  // console.log(jsonInterFaceOfExecuteMetaTransaction);
};
const init = async () => {
  var amountIn = 1000;
  var amountOutMin;
  var daiAddress = mDAIAddress;
  var WETHAddress = mETHAddress;
  // var TestTokenAddress = "0x6E20678432cc9beBC1c29DeE341ae20467A1AAC3";
  var to = ethereum.selectedAddress;
  var deadline;
  let path = [daiAddress, WETHAddress];

  // const uniswapFactoryAddress = "0xe2f197885abe8ec7c866cFf76605FD06d4576218";
  // const uniswapFactoryContract = new web3.eth.Contract(
  //   iuniswapV2FactoryAbi,
  //   uniswapFactoryAddress
  // );
  //
  // uniswapFactoryAddress.getPair()

  contract.methods.getAmountsOut(amountIn, path).call((err, res) => {
    if (err) console.log(err);
    else {
      amountOutMin = res[1];
      console.log(amountOutMin);
      amountOutMin = 1;
    }

    web3.eth.getAccounts((err, accounts) => {
      signer = accounts[0];
      console.log("signer" + signer);
      console.log("amountOutMin" + amountOutMin);

      web3.eth.getBlock("latest", (err, res) => {
        deadline = res.timestamp + 3600;
        console.log("deadline:" + deadline);
        let txParams = {
          from: signer,
          gasLimit: web3.utils.toHex(9000000),
          to: contractAddress,
          value: "0x0",
          data: contract.methods
            .swapExactTokensForTokens(
              amountIn,
              amountOutMin,
              path,
              to,
              deadline
            )
            .encodeABI()
        };
        console.log(txParams);
        var privatekey =
          "0x2A9595603DD147CA3639489E181BFED8BEC82DA0C301FD1CFD79F30063870F6A";
        web3.eth.accounts.signTransaction(
          txParams,
          privatekey,
          (err, signedTx) => {
            web3.eth.sendSignedTransaction(
              signedTx.rawTransaction,
              (error, txHash) => {
                if (error) {
                  return console.error(error);
                }
                console.log(txHash);
              }
            );
            //contract.methods.WETH().call((err, res) => console.log(res));
          }
        );
      });
    });
  });
};

var web3;
var biconomy;
var daiContract;

var moduleTry = {
  connectWallet: async function() {
    if (window.ethereum) {
      //  window.web3 = new Web3(window.ethereum);
      window.ethereum.enable().then(res => console.log(res));
    }
    biconomy = new Biconomy(window.ethereum, {
      dappId: "5e902c872cb02156d3b4cfe3",
      apiKey: "35BVLBEUZ.237627a0-9db9-4d07-87de-9e1548eef8ce",
      debug: "true"
    });
    web3 = new Web3(biconomy);
    biconomy
      .onEvent(biconomy.READY, async () => {
        console.log("hello");
        //await justTrying();
      })
      .onEvent(biconomy.ERROR, (error, message) => {
        console.log(error);
      });
  },
  unlockDai: async function() {
    function getDomainData(
      contractName,
      signatureVersion,
      chainId,
      contractAddress
    ) {
      return {
        name: contractName,
        version: signatureVersion,
        chainId: chainId,
        verifyingContract: contractAddress
      };
    }
    const domains = {};
    domains.getDaiDomainData = function(contractAddres, chainId) {
      return getDomainData("mDAI", "1", chainId, contractAddres);
    };
    //console.log(domains.getDomainData("0x214sdflj"));
    const schemas = {};

    //The schema of every contract that supports EIP712Domain

    schemas.domain = [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" }
    ];
    schemas.permit = [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" }
    ];
    const generators = {};

    function getRequestData(
      domainDataFn,
      contractAddress,
      chainId,
      messageTypeName,
      messageSchema,
      message
    ) {
      const domainData = domainDataFn(contractAddress, chainId);
      // console.log("domainData:"+ JSON.stringify(domainData));
      // console.log("DOMAIN_SEPARATOR: " + web3.utils.sha3(JSON.stringify(domainData)));
      const types = {
        EIP712Domain: schemas.domain
      };
      types[messageTypeName] = messageSchema;
      return {
        types: types,
        domain: domainData,
        primaryType: messageTypeName,
        message: message
      };
    }

    generators.getPermit = function(
      contractAddres,
      chainId,
      owner,
      spender,
      value,
      nonce,
      deadline
    ) {
      const message = {
        owner: owner,
        spender: spender,
        value: value,
        nonce: nonce,
        deadline: deadline
      };
      return getRequestData(
        domains.getDaiDomainData,
        contractAddres,
        chainId,
        "Permit",
        schemas.permit,
        message
      );
    };
    //console.log(generators.getPermit("0xcontractAddres","chainId","0xowner","0xSpender","nonce","deadline","allowed"))
    var contractAddress = mDAIAddress;
    var contractAbi = daiAbi;

    //console.log(daiAbi);

    const contract = new web3.eth.Contract(daiAbi, contractAddress);
    daiContract = contract;
    const accounts = await web3.eth.getAccounts();

    var owner = ethereum.selectedAddress;
    var spender = routerAddress; //The gasless router contract
    var value = 10;
    var nonce;
    var deadline;

    var latestBlock = await web3.eth.getBlock("latest");
    var _nonce = await contract.methods.nonces(owner).call();
    var nonce = parseInt(_nonce, 10);
    const minute = 3600;
    deadline = latestBlock.timestamp + minute;
    console.log("deadline: " + deadline);
    console.log("nonce: " + nonce);
    console.log("value:" + value);

    var chainId = await web3.eth.net.getId();
    console.log("chainId: " + chainId);
    let signatureData = generators.getPermit(
      contractAddress,
      chainId,
      owner,
      spender,
      value,
      nonce,
      deadline
    );
    console.log(signatureData);
    let sigString = JSON.stringify(signatureData);

    signer = accounts[0];
    //console.log(signatureData.primaryType)
    //web3.eth.personal.unlockAccount(accounts[0], "password", function (err, result) {console.log(result)})
    web3.providers.HttpProvider.prototype.sendAsync =
      web3.providers.HttpProvider.prototype.send;

    web3.currentProvider.sendAsync(
      {
        method: "eth_signTypedData_v4",
        params: [signer, sigString],
        from: signer
      },
      function(err, result) {
        if (err) {
          return console.error(err);
        }
        console.log(result);
        const signature = result.result.substring(2);
        const r = "0x" + signature.substring(0, 64);
        const s = "0x" + signature.substring(64, 128);
        const v = parseInt(signature.substring(128, 130), 16);
        // The signature is now comprised of r, s, and v.
        contract.methods
          .permit(owner, spender, value, deadline, v, r, s)
          .send({ from: accounts[0] })
          .then(console.log);
      }
    );
  },
  getExchangeRate: async function() {
    var inputToken = document.getElementById("inputToken").value;
    var amountIn = document.getElementById("input").value;
    var outputToken = document.getElementById("outputToken").value;
    var daiAddress = mDAIAddress;
    var WETHAddress = mETHAddress;
    var inputTokenAddress;
    var outputTokenAddress;
    if (inputToken === "dai") inputTokenAddress = daiAddress;
    if (outputToken === "WETH") outputTokenAddress = WETHAddress;

    var contractAbi = gaslessRouterAbi;
    var contractAddress = routerAddress;
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    var outputAmounts = await contract.methods
      .getAmountsOut(amountIn, [inputTokenAddress, outputTokenAddress])
      .call();
    var outputAmount = outputAmounts[1];
    console.log(outputAmount);
    console.log(outputAmounts);

    document.getElementById("output").value = outputAmount;
  },
  swap: async function() {
    var inputToken = document.getElementById("inputToken").value;
    var amountIn = document.getElementById("input").value;
    var outputToken = document.getElementById("outputToken").value;
    var daiAddress = mDAIAddress;
    var WETHAddress = mETHAddress;
    var inputTokenAddress;
    var outputTokenAddress;
    if (inputToken === "dai") inputTokenAddress = daiAddress;
    if (outputToken === "WETH") outputTokenAddress = WETHAddress;
    var contractAbi = gaslessRouterAbi;
    var contractAddress = routerAddress;
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    var amountOutMin = 1;
    var path = [inputTokenAddress, outputTokenAddress];
    var to = ethereum.selectedAddress;
    var expiry = 12345678911110; //large number
    var swapExactTokensForTokensFunctionSignature = web3.eth.abi.encodeFunctionCall(
      jsonInterFaceOfSwapExactTokensForTokens,
      [amountIn, 1, path, to, expiry]
    );
    let accounts = await web3.eth.getAccounts();
    let signer = accounts[0];
    let chainId = await web3.eth.net.getId();
    let nonce = await contract.methods.getNonce(signer).call();

    let signatureData = generators.getMetaTransaction(
      contractAddress,
      chainId,
      nonce,
      signer,
      swapExactTokensForTokensFunctionSignature
    );
    let sigString = JSON.stringify(signatureData);

    web3.providers.HttpProvider.prototype.sendAsync =
      web3.providers.HttpProvider.prototype.send;
    web3.currentProvider.sendAsync(
      {
        method: "eth_signTypedData_v4",
        params: [signer, sigString],
        from: signer
      },
      function(err, result) {
        if (err) {
          return console.error(err);
        }
        console.log(result);
        const signature = result.result.substring(2);
        const sigR = "0x" + signature.substring(0, 64);
        const sigS = "0x" + signature.substring(64, 128);
        const sigV = parseInt(signature.substring(128, 130), 16);

        contract.methods
          .executeMetaTransaction(
            signer,
            swapExactTokensForTokensFunctionSignature,
            sigR,
            sigS,
            sigV
          )
          .send({ from: signer }, (err, res) => {
            if (err) console.log(err);
            else console.log(res);
          });
      }
    );
  }
};
module.exports = moduleTry;

// web3.eth.net
//   .isListening()
//   .then(() => console.log("web3 is connected"))
//   .catch(e => console.log("Wow. Something went wrong"));

// var contractAddress = "0x043cBDe163C54EFec85b63E713b37DC601d61A30";
//
// var contractAbi = gaslessRouterAbi;
// const contract = new web3.eth.Contract(contractAbi, contractAddress);
//
// var amountIn = 100;
// var amountOutMin;
// var daiAddress = "0x9351d2a3d8a46a28b35BC8b8F7834172E7eC72f2";
// var WETHAddress = "0xB026460660ECfCA90d50ee25560aef3Bcf61a3b1";
// var TestTokenAddress = "0x6E20678432cc9beBC1c29DeE341ae20467A1AAC3";
// var to = "0x208295274e99C03fbd2BA0773c40fcdCF99E1803";
// var deadline;
// let path = [daiAddress, WETHAddress];
// console.log(path);
//
// // const uniswapFactoryAddress = "0xe2f197885abe8ec7c866cFf76605FD06d4576218";
// // const uniswapFactoryContract = new web3.eth.Contract(
// //   iuniswapV2FactoryAbi,
// //   uniswapFactoryAddress
// // );
// //
// // uniswapFactoryAddress.getPair()
//
// contract.methods.getAmountsOut(amountIn, path).call((err, res) => {
//   if (err) console.log(err);
//   else {
//     amountOutMin = res[1];
//   }
//
//   web3.eth.getAccounts((err, accounts) => {
//     signer = accounts[0];
//     console.log("signer" + signer);
//     console.log("amountOutMin" + amountOutMin);
//
//     web3.eth.getBlock("latest", (err, res) => {
//       deadline = res.timestamp + 3600;
//       console.log("deadline:" + deadline);
//       let txParams = {
//         from: signer,
//         gasLimit: web3.utils.toHex(210000),
//         to: contractAddress,
//         value: "0x0",
//         data: contract.methods
//           .swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline)
//           .encodeABI()
//       };
//       console.log(txParams);
//       var privatekey =
//         "0x2A9595603DD147CA3639489E181BFED8BEC82DA0C301FD1CFD79F30063870F6A";
//       web3.eth.accounts.signTransaction(
//         txParams,
//         privatekey,
//         (err, signedTx) => {
//           web3.eth.sendSignedTransaction(
//             signedTx.rawTransaction,
//             (error, txHash) => {
//            )   if (error) {
//                 return console.error(error);
//               }
//               console.log(txHash);
//             }
//           );
//           //contract.methods.WETH().call((err, res) => console.log(res));
//         }
//       );
//     });
//   });
// });

// web3.eth.getBlock("latest", (err, res) => {
//   deadline = res.timestamp + 3600;
//   console.log(deadline);
//   contract.methods
//     .swapExactTokensForTokens(
//       amountIn,
//       amountOutMin,
//       [daiAddress, WETHAddress],
//       to,
//       deadline
//     )

//     .send(
//       {
//         from: "0x7f05D0d5318D51f9AE9AA82A5a904f2251ecE57E"
//         // gaslimit: 100000000,
//         // gasprice: 20
//       }
//       // (err, res) => {
//       //   if (err) console.log(err);
//       //   else console.log(res);
//       // }
//     )
//     .on("transactionHash", function(transactionHash) {
//       console.log(transactionHash);
//     })
//     .on("receipt", function(receipt) {
//       console.log(receipt);
//     });
//   //contract.methods.WETH().call((err, res) => console.log(res));
//});
