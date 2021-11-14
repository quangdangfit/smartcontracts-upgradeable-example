import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import { upgrades, ethers } from "hardhat";
import { Contract } from "ethers";

async function main() {
    const [owner] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", owner.address);
    console.log("Account balance:", (await owner.getBalance()).toString());

    let box: Contract;

    const deploy = async () => {
        const Box = await ethers.getContractFactory('Box');
        console.log('Deploying Box...');
        box = await (await upgrades.deployProxy(Box, [42], { initializer: 'store' })).deployed();
        console.log('Box deployed to:', box.address);
    }

    const consoleAddresses = async () => {
        console.table({
            Box: box.address,
        });
    };

    await deploy();
    await consoleAddresses();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
