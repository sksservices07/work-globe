export const networkConfig = {

    "137": [
        {
            contractProxyAddress: "0x5471FF36b9007620505E5f119F022Ca24Abf8e90", //proxy deployment
            networkName: "Polygon mainnet"
        },
    ],
    "44787": [
        {
            contractProxyAddress: "0x70ee51D75c28DE0bB0fc1D10760BB297a79Ed867", //proxy deployment
            networkName: "alfajores"
        },
    ],
    "80001": [
        {
            contractProxyAddress: "0xbf3FFcEfEeee311564D39445BceD995548f9aF38", //proxy deployment
            networkName: "Mumbai Testnet"
        },
    ],

}

export const getConfigByChain = (chain) => networkConfig[chain]