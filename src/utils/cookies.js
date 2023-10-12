import Cookies from "js-cookie";

const setWallet = (wallet) => {
  Cookies.set("wallet", wallet);
  console.info("Wallet set to: " + wallet);
};

const deleteWallet = () => {
  Cookies.remove("wallet");
  console.info("Wallet deleted");
};

const getWallet = () => {
  const wallet = Cookies.get("wallet");
  return wallet;
};

const isWalletExists = () => {
  const wallet = Cookies.get("wallet");
  if (wallet) return true;
  return false;
};

export { setWallet, deleteWallet, getWallet, isWalletExists };
