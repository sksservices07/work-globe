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
            contractProxyAddress: "0x4Ead137B310526e6d87a7d5d45eE1De317b68114", //proxy deployment
            networkName: "Mumbai Testnet"
        },
    ],

}

export const getConfigByChain = (chain) => networkConfig[chain]