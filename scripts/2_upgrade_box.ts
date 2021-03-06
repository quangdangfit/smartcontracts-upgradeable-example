import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import { upgrades, ethers } from "hardhat";
import { Contract } from "ethers";

async function main() {
    const [owner] = await ethers.getSigners();
    console.log("Upgrading contracts with the account:", owner.address);
    console.log("Account balance:", (await owner.getBalance()).toString());

    const boxAddress = '0xDfB3cf8D499912Fc837bAc755D1f350491AB00ED';

    const deploy = async () => {
        const BoxV2 = await ethers.getContractFactory('BoxV2');
        console.log('Upgrading Box...');
        await upgrades.upgradeProxy(boxAddress, BoxV2);
    };

    await deploy();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
