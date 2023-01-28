const { ethers, upgrades } = require("hardhat")


async function main() {

  const job = await ethers.getContractFactory("Job")
  //const proxy = await upgrades.deployProxy(gateway, ["0xB5b93720E9b5F7650164b4962E8Dfe2DBdF94488", "asohmwkdib3ijn3vbbs9ejb5ja09djnwmmw"])
  //const jobContract = await job.deploy(paramName,{value:paramvalue});
  //await phoneLink.deployed();
  const proxy = await upgrades.deployProxy(job)
  console.log("Job contract deployed to:", proxy.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("This is error")
    console.error(error)
    process.exit(1)
  })
