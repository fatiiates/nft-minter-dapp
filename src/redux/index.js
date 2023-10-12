import { combineReducers } from "redux";
import WalletReducer from "@redux/reducers/entities/wallet";
import ListingMethodReducer from "@redux/reducers/entities/listingMethod";

const rootReducer = combineReducers({
  WalletReducer,
  ListingMethodReducer,
});

export default rootReducer;
