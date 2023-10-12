import React from "react";
import { connect } from "react-redux";
import { Alert } from "@mui/material";

const WalletNotConnected = ({}) => {
  return (
    <React.Fragment>
      <Alert severity="warning">No wallet connected</Alert>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(WalletNotConnected);
