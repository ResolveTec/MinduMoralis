// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const Mindu = await hre.ethers.getContractFactory("Mindu");
  const defaultOperators = ["0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE"]; // mindu University
  const initialSupply = 1000000000 * 10 * 18;

  const mindu = await Mindu.deploy(initialSupply, defaultOperators);
  await mindu.deployed();

  console.log("Mindu deployed to:", mindu.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
