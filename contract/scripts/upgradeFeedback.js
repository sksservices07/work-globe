const { ethers, upgrades } = require("hardhat")

async function main() {
    const feedback = await ethers.getContractFactory("FeedbackContract")
    //let proxy = await upgrades.upgradeProxy("0x70ee51D75c28DE0bB0fc1D10760BB297a79Ed867", job); //alfajores
    let proxy = await upgrades.upgradeProxy("0x64Ca1dEee8d19F94CaFC1FaF746742C9da4845d4", feedback); //mumbai
    console.log("feedback Contract has been successfully upgraded...")
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("This is error")
        console.error(error)
        process.exit(1)
    })
