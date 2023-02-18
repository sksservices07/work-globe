export const networkConfig = {

    "137": [
        {
            contractProxyAddress: "", //proxy deployment
            networkName: "Polygon mainnet"
        },
    ],
    "44787": [
        {
            contractProxyAddress: "", //proxy deployment
            networkName: "alfajores"
        },
    ],
    "80001": [
        {
            contractProxyAddress: "0xf2c17dE96eD083b16562387Da7cDD439381016A1", //proxy deployment
            networkName: "Mumbai Testnet"
        },
    ],

}

export const getConfigByChain = (chain) => networkConfig[chain]