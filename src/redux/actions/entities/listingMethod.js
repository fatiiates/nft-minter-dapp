import * as actionTypes from "@redux/actionTypes";
import { LISTING_METHODS } from "@constants";

function setListingMethod(listingMethod) {
  if (listingMethod === null || listingMethod === undefined) {
    listingMethod = LISTING_METHODS.ALL;
  }

  return {
    type: actionTypes.LISTING_METHOD.SET_LISTING_METHOD,
    payload: listingMethod,
  };
}

export { setListingMethod };
