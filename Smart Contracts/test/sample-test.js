const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mindu", function () {
  it("Should return the deployed ok", async function () {
    const Mindu = await ethers.getContractFactory("Mindu");
    const defaultOperators = ["0xdD2FD4581271e230360230F9337D5c0430Bf44C0"];
    const initialSupply = 100000000;

    const mindu = await Mindu.deploy(initialSupply, defaultOperators);
    await mindu.deployed();

    expect(await mindu.totalSupply()).to.equal(initialSupply);

    /*  const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");*/
  });
});
