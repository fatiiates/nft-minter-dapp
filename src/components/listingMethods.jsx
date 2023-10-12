import React from "react";
import { connect } from "react-redux";
import { setListingMethod } from "@redux/actions/entities/listingMethod";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LISTING_METHODS } from "@constants";

const ListingMethods = ({ LISTING_METHOD, setListingMethod }) => {
  const handleChange = (event) => {
    setListingMethod(event.target.value);
  };

  return (
    <React.Fragment>
      <Box sx={{ minWidth: 120, margin: "10px" }}>
        <FormControl>
          <InputLabel htmlFor="listing-method">Listing Method</InputLabel>
          <Select
            value={LISTING_METHOD}
            onChange={handleChange}
            label="Listing Method"
            inputProps={{
              id: "listing-method",
            }}
          >
            {Object.entries(LISTING_METHODS).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    LISTING_METHOD: state.ListingMethodReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListingMethod: (method) => dispatch(setListingMethod(method)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingMethods);
