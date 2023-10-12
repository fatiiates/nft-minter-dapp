import * as actionTypes from '@redux/actionTypes';
import initialState from "@redux/initialState";

const WalletReducer = (state = initialState.WALLET, action) => {
  switch (action.type) {
    case actionTypes.WALLET.SET_WALLET:
      return action.payload;
    default:
      return state;
  }
};

export default WalletReducer;
