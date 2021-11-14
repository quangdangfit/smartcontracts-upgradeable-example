import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import { upgrades, ethers } from "hardhat";
import { Contract } from "ethers";

async function main() {
    const [owner] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", owner.address);
    console.log("Account balance:", (await owner.getBalance()).toString());

    let box: Contract;

    const Box = await ethers.getContractFactory("Box");
    box = Box.attach("0xDfB3cf8D499912Fc837bAc755D1f350491AB00ED");

    const tnx = await box.increment();
    console.log(tnx);

    console.log((await box.retrieve()).toString());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
