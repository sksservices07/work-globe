const { ethers, upgrades } = require("hardhat")


async function main() {

    const feedback = await ethers.getContractFactory("FeedbackContract")
    const proxy = await upgrades.deployProxy(feedback)
    console.log("feedback contract deployed to:", proxy.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("This is error")
        console.error(error)
        process.exit(1)
    })
