import * as actionTypes from '@redux/actionTypes';
import initialState from "@redux/initialState";

const ListingMethodReducer = (state = initialState.LISTING_METHOD, action) => {
  switch (action.type) {
    case actionTypes.LISTING_METHOD.SET_LISTING_METHOD:
      return action.payload;
    default:
      return state;
  }
}

export default ListingMethodReducer;