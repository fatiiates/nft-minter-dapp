const { Network, Alchemy } = require("alchemy-sdk");

var alchemy = null;

const initAlchemy = () => {
  if (alchemy) return alchemy;

  alchemy = new Alchemy({
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
  });

  alchemy.baseURL = getAlchemyBaseUrl();

  return alchemy;
};

const getAlchemy = () => {
  if (alchemy) return alchemy;

  return initAlchemy();
};

const getAlchemyBaseUrl = () => {
  const {
    config: { network, apiKey },
  } = getAlchemy();
  return `https://${network}.g.alchemy.com/v2/${apiKey}`;
};

export { initAlchemy, getAlchemy, getAlchemyBaseUrl };
