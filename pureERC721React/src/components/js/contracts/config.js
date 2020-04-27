let config = {};
config.address = {
  mDAI: "0x58AaBb5dbE1DA9329Dc45eBac9b6476c1BDe2213",
  mETH: "0xdf30e77DBA18b3Ddfa26EDf746773E7b9F3c2860",
  m0x: "0xBfE3F3f7C7ECEC666D837D70C4Fa25fDa229bFBc",
  MANA: "0x5c945E7eCBb1055376b007373F483563bc555ca3",
  mBTC: "0x8B317c147D2f2f8BC117dEAD6cCedC28E5904487",
  mUSDT: "0x2A3049e72C7A04E53B2dF2F17678701D529f6796",
  factoryAddress: "0x0Aa45DAeE5840d4FC9DC07F3572B0Bbe480082ff",
  routerAddress: "0xE4C953f9A9616EA36442fa8e387b90d5a70cd4b8"
};
config.contract = {
  erc20Abi: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_initialSupply",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_chainId",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256"
        }
      ],
      name: "Approval",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      constant: true,
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "PERMIT_TYPEHASH",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256"
        }
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "nonces",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "address",
          name: "spender",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        },
        {
          internalType: "uint8",
          name: "v",
          type: "uint8"
        },
        {
          internalType: "bytes32",
          name: "r",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "s",
          type: "bytes32"
        }
      ],
      name: "permit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256"
        }
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256"
        }
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "mint",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  routerAbi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_WETH",
          type: "address"
        },
        {
          internalType: "address",
          name: "_factoryAddress",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_chainId",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      payable: true,
      stateMutability: "payable",
      type: "fallback"
    },
    {
      constant: true,
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "SWAP_TYPEHASH",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "WETH",
      outputs: [
        {
          internalType: "contract IWETH",
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "factory",
      outputs: [
        {
          internalType: "contract IUniswapV2Factory",
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "reserveIn",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "reserveOut",
          type: "uint256"
        }
      ],
      name: "getAmountIn",
      outputs: [
        {
          internalType: "uint256",
          name: "amountIn",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "pure",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "amountIn",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "reserveIn",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "reserveOut",
          type: "uint256"
        }
      ],
      name: "getAmountOut",
      outputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "pure",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "path",
          type: "address[]"
        }
      ],
      name: "getAmountsIn",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
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
      ],
      name: "getAmountsOut",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "nonces",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
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
      ],
      name: "quote",
      outputs: [
        {
          internalType: "uint256",
          name: "amountB",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "pure",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "tokenA",
          type: "address"
        },
        {
          internalType: "address",
          name: "tokenB",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "amountADesired",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountBDesired",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountAMin",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountBMin",
          type: "uint256"
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
      ],
      name: "addLiquidity",
      outputs: [
        {
          internalType: "uint256",
          name: "amountA",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountB",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "liquidity",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "amountTokenDesired",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountTokenMin",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountETHMin",
          type: "uint256"
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
      ],
      name: "addLiquidityETH",
      outputs: [
        {
          internalType: "uint256",
          name: "amountToken",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountETH",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "liquidity",
          type: "uint256"
        }
      ],
      payable: true,
      stateMutability: "payable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "tokenA",
          type: "address"
        },
        {
          internalType: "address",
          name: "tokenB",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "liquidity",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountAMin",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountBMin",
          type: "uint256"
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
      ],
      name: "removeLiquidity",
      outputs: [
        {
          internalType: "uint256",
          name: "amountA",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountB",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "liquidity",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountTokenMin",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountETHMin",
          type: "uint256"
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
      ],
      name: "removeLiquidityETH",
      outputs: [
        {
          internalType: "uint256",
          name: "amountToken",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountETH",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "tokenA",
          type: "address"
        },
        {
          internalType: "address",
          name: "tokenB",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "liquidity",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountAMin",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountBMin",
          type: "uint256"
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
        },
        {
          internalType: "bool",
          name: "approveMax",
          type: "bool"
        },
        {
          internalType: "uint8",
          name: "v",
          type: "uint8"
        },
        {
          internalType: "bytes32",
          name: "r",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "s",
          type: "bytes32"
        }
      ],
      name: "removeLiquidityWithPermit",
      outputs: [
        {
          internalType: "uint256",
          name: "amountA",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountB",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "liquidity",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountTokenMin",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountETHMin",
          type: "uint256"
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
        },
        {
          internalType: "bool",
          name: "approveMax",
          type: "bool"
        },
        {
          internalType: "uint8",
          name: "v",
          type: "uint8"
        },
        {
          internalType: "bytes32",
          name: "r",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "s",
          type: "bytes32"
        }
      ],
      name: "removeLiquidityETHWithPermit",
      outputs: [
        {
          internalType: "uint256",
          name: "amountToken",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountETH",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
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
      ],
      name: "swapExactTokensForTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountInMax",
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
      ],
      name: "swapTokensForExactTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
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
      ],
      name: "swapExactETHForTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      payable: true,
      stateMutability: "payable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountInMax",
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
      ],
      name: "swapTokensForExactETH",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
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
      ],
      name: "swapExactTokensForETH",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "amountOut",
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
      ],
      name: "swapETHForExactTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      payable: true,
      stateMutability: "payable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "inputToken",
          type: "address"
        },
        {
          internalType: "address",
          name: "outputToken",
          type: "address"
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
        },
        {
          internalType: "uint8",
          name: "v",
          type: "uint8"
        },
        {
          internalType: "bytes32",
          name: "r",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "s",
          type: "bytes32"
        }
      ],
      name: "swap",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  factoryAbi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_feeToSetter",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "token0",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "token1",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "pair",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "PairCreated",
      type: "event"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "allPairs",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "feeTo",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "feeToSetter",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "getPair",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "allPairsLength",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "tokenA",
          type: "address"
        },
        {
          internalType: "address",
          name: "tokenB",
          type: "address"
        }
      ],
      name: "createPair",
      outputs: [
        {
          internalType: "address",
          name: "pair",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "_feeTo",
          type: "address"
        }
      ],
      name: "setFeeTo",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "_feeToSetter",
          type: "address"
        }
      ],
      name: "setFeeToSetter",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ]
};

module.exports = { config };
