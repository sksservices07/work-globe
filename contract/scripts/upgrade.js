const { ethers, upgrades } = require("hardhat")

async function main() {
    const job = await ethers.getContractFactory("JobContract")
    //let proxy = await upgrades.upgradeProxy("0x70ee51D75c28DE0bB0fc1D10760BB297a79Ed867", job); //alfajores
    let proxy = await upgrades.upgradeProxy("0xf2c17dE96eD083b16562387Da7cDD439381016A1", job); //mumbai
    console.log("Job Contract has been successfully upgraded...")
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("This is error")
        console.error(error)
        process.exit(1)
    })
