import { retry } from "@utils/retry";
import { getAllNFTs, getNFTsByOwner } from "@blockchain/NFT/list";
import { LISTING_METHODS } from "@constants";

const load = async (page, rowsPerPage, wallet, method) => {
  return new Promise((resolve, reject) => {
    const start = (page - 1) * rowsPerPage;

    if (method === LISTING_METHODS.ALL) {
      getAllNFTs(start, rowsPerPage)
        .then(({ nfts, total }) => {
          resolve({ nfts, total });
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    } else {
      getNFTsByOwner(wallet, start, rowsPerPage)
        .then(({ nfts, total }) => {
          resolve({ nfts, total });
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    }
  });
};

export default async function handler(req, res) {
  try {
    const { page, rowsPerPage, wallet, method } = req.query;

    const f = async () => {
      return await load(page, rowsPerPage, wallet, method);
    };

    const { nfts, total } = await retry(f, 50, 500);
    res.status(200).json({ nfts, total });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
