import { getContract } from "@utils/contract";
import web3 from "web3";
import * as constants from "@constants";

const mint = async (wallet, name, fileReference, price) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!wallet) {
        throw new Error("Wallet is required");
      }
      if (!name) {
        throw new Error("Name is required");
      }
      if (!fileReference) {
        throw new Error("File reference is required");
      }
      const contract = await getContract();

      const royalty = (price * constants.BLOCKCHAIN.ROYALTY_FEE) / 100;

      const priceETH = web3.utils.toWei(price.toString(), "ether");
      const royaltyETH = web3.utils.toWei(royalty.toString(), "ether");
      
      const data = await contract.methods
        .mintNFT(name, fileReference, priceETH)
        .encodeABI();

      const params = {
        from: wallet,
        to: contract.options.address,
        value: royaltyETH,
        data: data,
        gasLimit: "50000",
      };

      const transactionHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [params],
      });

      console.info("Transaction hash: ", transactionHash);

      resolve(transactionHash);
    } catch (error) {
      console.error("Error minting NFT:", error);
      reject(error);
    }
  });
};

export default mint;
