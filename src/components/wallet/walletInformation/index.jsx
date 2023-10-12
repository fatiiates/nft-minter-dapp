import React from "react";
import { connect } from "react-redux";
import { Container } from "@mui/material";
import WalletNotConnected from "./walletNotConnected";
import WalletConnected from "./walletConnected";

const WalletInformation = ({ WALLET }) => {
  return (
    <Container
      style={{
        marginTop: "20px",
      }}
      maxWidth="sm"
    >
      {WALLET && <WalletConnected /> }
      {WALLET == "" &&  <WalletNotConnected />}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    WALLET: state.WalletReducer,
  };
};

export default connect(mapStateToProps)(WalletInformation);
