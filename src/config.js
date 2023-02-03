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
            contractProxyAddress: "0xD70b02bC77cd872049c0F988Fe9b7900A1eDF229", //proxy deployment
            networkName: "Mumbai Testnet"
        },
    ],

}

export const getConfigByChain = (chain) => networkConfig[chain]