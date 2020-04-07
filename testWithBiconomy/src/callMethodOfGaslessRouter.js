var Web3 = require("web3");
var Biconomy = require("@biconomy/mexa");
const init = async () => {
  var contractAddress = "0xfDF3579A72F371aa22687DAF4566F48ddc159F80";

  var contractAbi = gaslessRouterAbi;
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  var amountIn = 100;
  var amountOutMin;
  var daiAddress = "0x59DdAdcE870827186fC0aB55d8BFA9C601c3C4C0";
  var WETHAddress = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
  var TestTokenAddress = "0x6E20678432cc9beBC1c29DeE341ae20467A1AAC3";
  var to = "0x208295274e99C03fbd2BA0773c40fcdCF99E1803";
  var deadline;
  let path = [daiAddress, WETHAddress];
  console.log(path);

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
          gasLimit: web3.utils.toHex(210000),
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

if (window.ethereum) {
  //  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable().then(res => console.log(res));
}
const biconomy = new Biconomy(window.ethereum, {
  dappId: "5e817cc88d62414c7a8755e0",
  apiKey: "MLQRERuDS.ef47dced-a37e-4959-ab6d-c698096febb9"
});
var web3 = new Web3(biconomy);
biconomy
  .onEvent(biconomy.READY, async () => {
    console.log("hello");
  })
  .onEvent(biconomy.ERROR, (error, message) => {
    console.log("message:      " + message);
  });

web3.eth.net
  .isListening()
  .then(() => console.log("web3 is connected"))
  .catch(e => console.log("Wow. Something went wrong"));

// init();

// var contractAddress = "0xfDF3579A72F371aa22687DAF4566F48ddc159F80";
//
// var contractAbi = gaslessRouterAbi;
// const contract = new web3.eth.Contract(contractAbi, contractAddress);
//
// var amountIn = 100;
// var amountOutMin;
// var daiAddress = "0x59DdAdcE870827186fC0aB55d8BFA9C601c3C4C0";
// var WETHAddress = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
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
//               if (error) {
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
// });
