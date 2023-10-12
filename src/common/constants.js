const LISTING_METHODS = {
  ALL: "ALL",
  OWNER: "OWNER",
};

const BLOCKCHAIN = {
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  ROYALTY_FEE: 10, // 10%
};

export { LISTING_METHODS, BLOCKCHAIN };