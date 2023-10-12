import { getAlchemy } from "@/utils/alchemy";
import { getContract } from "@utils/contract";
import web3 from "web3";
import * as constants from "@constants";
import { retry } from "@/utils/retry";

const contractAddress = constants.BLOCKCHAIN.CONTRACT_ADDRESS;

// Get NFTs by owner
const getNFTsByOwner = async (wallet, start, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getContract();
      const { 0: tokenIds, 1: total } = await contract.methods
        .getNFTsByOwner(wallet, start, limit)
        .call();

      const nfts = await getNfts(tokenIds);

      resolve({ nfts, total: parseInt(total) });
    } catch (error) {
      console.error("[getNFTsByOwner]", error.code, error);
      reject(error);
    }
  });
};

// Get all NFTs
const getAllNFTs = async (start, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getContract();
      const { 0: tokenIds, 1: total } = await contract.methods
        .getAllNFTs(start, limit)
        .call();

      const nfts = await getNfts(tokenIds);

      resolve({ nfts, total: parseInt(total) });
    } catch (error) {
      console.error("[getAllNFTs]", error);
      reject(error);
    }
  });
};

const getNfts = async (tokenIds) => {
  return await Promise.all(
    tokenIds.map(async (tokenId) => {
      const load = async () => {
        return new Promise(async (resolve, reject) => {
          try {
            const contract = await getContract();

            const data = await contract.methods.nftData(tokenId).call();
            const priceInWei = data.price.toString();
            const priceInEther = web3.utils.fromWei(priceInWei, "ether");
            resolve({
              tokenId: tokenId.toString(),
              name: data.name,
              fileReference: data.fileReference,
              price: priceInEther,
            });
          } catch (error) {
            console.error("[getNfts]", error);
            reject(error);
          }
        });
      };

      return await retry(load, 50, 500);
    })
  );
};

const getTotalNFTs = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const alchemy = getAlchemy();
      const res = await alchemy.nft.getContractMetadata(contractAddress);

      resolve(res);
    } catch (error) {
      console.error("[getTotalNFTs]", error);
      reject(error);
    }
  });
};

export { getNFTsByOwner, getAllNFTs, getTotalNFTs };
