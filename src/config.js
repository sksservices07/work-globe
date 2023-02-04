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
            contractProxyAddress: "0x179823c5C74463DfffB28B42b400cd1cA6466DAd", //proxy deployment
            networkName: "Mumbai Testnet"
        },
    ],

}

export const getConfigByChain = (chain) => networkConfig[chain]