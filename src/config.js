export const networkConfig = {

    "137": [
        {
            contractProxyAddress: "", //proxy deployment
            feedbackAddress: "",//proxy
            networkName: "Polygon mainnet"
        },
    ],
    "80001": [
        {
            contractProxyAddress: "0xf2c17dE96eD083b16562387Da7cDD439381016A1", //proxy deployment
            feedbackAddress: "0x64Ca1dEee8d19F94CaFC1FaF746742C9da4845d4",//proxy
            networkName: "Mumbai Testnet"
        },
    ],

}

export const getConfigByChain = (chain) => networkConfig[chain]
