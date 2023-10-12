import React from "react";
import { connect } from "react-redux";
import { Alert, Button, Box } from "@mui/material";
import { Link } from "next/link";

const WalletConnected = ({ WALLET }) => {
  return (
    <React.Fragment>
      <Alert severity="warning">
        Disconnect button will just remove local data. To fully disconnect from
        our site, use the MetaMask extension's "Disconnect" feature. This
        ensures the wallet is no longer connected for added security.
      </Alert>
      <Alert
        severity="success"
        sx={{
          marginTop: "20px",
        }}
      >
        Connected: {WALLET}
      </Alert>
      <Box display="flex" justifyContent="center" alignItems="center">
        <a href="/list">
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Continue with this wallet
          </Button>
        </a>
      </Box>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    WALLET: state.WalletReducer,
  };
};

export default connect(mapStateToProps)(WalletConnected);
