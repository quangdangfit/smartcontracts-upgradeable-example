import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import "hardhat-gas-reporter";
import * as dotenv from "dotenv";

dotenv.config();

const bscTestnetPrivateKey = process.env.BSC_TESTNET_PRIVATE_KEY;
const bscMainnetPrivateKey = process.env.BSC_MAINNET_PRIVATE_KEY;
const reportGas = process.env.REPORT_GAS;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "development",
    networks: {
        development: {
            url: "http://127.0.0.1:8545"
        },
        testnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            chainId: 97,
            gas: 2100000,
            gasPrice: 10000000000,
            accounts: [bscTestnetPrivateKey],
            timeout: 2_147_483_647
        },
        mainnet: {
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            gasPrice: 10000000000,
            accounts: [bscMainnetPrivateKey],
            timeout: 2_147_483_647
        },
    },
    solidity: {
        version: "0.8.0",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000
            }
        }
    },
    abiExporter: {
        path: "data/abi",
        clear: true,
        flat: true,
        only: [],
        spacing: 4,
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    gasReporter: {
        enabled: reportGas == "1",
    },
    mocha: {
        timeout: 20000
    }
}