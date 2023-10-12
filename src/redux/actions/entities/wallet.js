import * as actionTypes from "@redux/actionTypes";
import { setWallet as setWalletCookie } from "@/utils/cookies";

function setWallet(wallet) {
  if (wallet === null || wallet === undefined) {
    wallet = "";
  }

  setWalletCookie(wallet);

  return { type: actionTypes.WALLET.SET_WALLET, payload: wallet };
}

export { setWallet };
