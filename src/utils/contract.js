import Web3 from "web3";
import { getAlchemy } from "./alchemy";
import * as constants from "@constants";

const contractAddress = constants.BLOCKCHAIN.CONTRACT_ADDRESS;
const ABI = require("./abi.json");

var contract = null;

const initContract = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const alchemy = getAlchemy();
      const web3 = new Web3(alchemy.baseURL);

      contract = new web3.eth.Contract(ABI, contractAddress);

      resolve(contract);
    } catch (error) {
      console.error("initContract", error);
      reject(error);
    }
  });
};

const getContract = () => {
  return new Promise(async (resolve, reject) => {
    if (!contract) {
      await initContract()
        .then(() => {
          resolve(contract);
        })
        .catch((error) => {
          reject(error);
        });
    } else resolve(contract);
  });
};

export { contractAddress, ABI, getContract, initContract };
