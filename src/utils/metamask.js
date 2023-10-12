import { setWallet, deleteWallet } from "@/utils/cookies";

const connectYourWallet = () => {
  return new Promise((resolve, reject) => {
    const { ethereum } = window;
    if (!ethereum) {
      reject("Please install MetaMask extension.");
      return;
    }
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        const wallet = accounts[0];
        setWallet(wallet);
        resolve();
      })
      .catch((err) => reject(err));
  });
};

const deConnectYourWallet = () => {
  return new Promise((resolve, reject) => {
    deleteWallet();
    resolve();
  });
};

const subscribeToWalletChange = (setWallet) => {
  const { ethereum } = window;
  if (!ethereum) {
    return;
  }
  ethereum.on("accountsChanged", (accounts) => {
    const wallet = accounts[0];
    setWallet(wallet);
  });
};

const metamaskValidation = () => {
  return new Promise(async (resolve, reject) => {
    const { ethereum } = window;
    if (!ethereum) {
      reject("Please install MetaMask extension.");
    }

    // check chainId
    const chainId = await ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0xaa36a7") {
      reject("Please connect to Sepolia Test Network.");
    }

    ethereum.on("chainChanged", (accounts) => {
      window.location.reload();
    });
    
    resolve();
  });
};

export {
  connectYourWallet,
  deConnectYourWallet,
  subscribeToWalletChange,
  metamaskValidation,
};
