const { ethers, upgrades } = require("hardhat")


async function main() {

  //const candidate = await ethers.getContractFactory("CandidateContract")
  //const proxyCandidate = await upgrades.deployProxy(job)
  const job = await ethers.getContractFactory("JobContract")
  const proxy = await upgrades.deployProxy(job, ["0xa4bC99F48054af823eefA73a0CC372B711099EF0"])
  //const proxy = await upgrades.deployProxy(gateway, ["0xB5b93720E9b5F7650164b4962E8Dfe2DBdF94488", "asohmwkdib3ijn3vbbs9ejb5ja09djnwmmw"])
  //const jobContract = await job.deploy(paramName,{value:paramvalue});
  //await phoneLink.deployed();
  //const proxy = await upgrades.deployProxy(proxyJob)
  console.log("Job contract deployed to:", proxy.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("This is error")
    console.error(error)
    process.exit(1)
  })
