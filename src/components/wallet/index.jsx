import { Button, Box, Typography } from "@mui/material";
import { connectYourWallet, deConnectYourWallet } from "@utils/metamask";
import { connect } from "react-redux";
import { setWallet } from "@/redux/actions/entities/wallet";
import { getWallet } from "@/utils/cookies";
import React from "react";
import WalletInformation from "@/components/wallet/walletInformation";
import MetaMaskLogo from "@assets/metamask.svg"
import Image from "next/image";

const NoWallet = ({ setWallet }) => {
  const handleConnect = () => {
    connectYourWallet()
      .then(() => {
        const wallet = getWallet();
        setWallet(wallet);
      })
      .catch((err) => setWallet(""));
  };

  return (
    <Button
      onClick={handleConnect}
      variant="contained"
      color="primary"
      style={{ padding: "10px" }}
    >
      <Image
        src={MetaMaskLogo}
        alt="MetaMask Icon"
        style={{ marginRight: "8px" }}
        width={32}
        height={32}
        priority={true}
      />
      Connect
    </Button>
  );
};

const WalletConnected = ({ setWallet }) => {
  const handleDelete = () => {
    deConnectYourWallet()
      .then(() => {
        setWallet("");
      })
      .catch((err) => setWallet(""));
  };

  return (
    <Button
      onClick={handleDelete}
      variant="contained"
      color="error"
      style={{ padding: "10px" }}
    >
      <Image
        src={MetaMaskLogo}
        alt="MetaMask Icon"
        style={{ marginRight: "8px" }}
        width={32}
        height={32}
        priority={true}
      />
      Disconnect
    </Button>
  );
};

const Wallet = ({ WALLET, setWallet }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box>
        <Typography style={{ marginBottom: "100px"}}  variant="h1" align="center">
          Welcome to the <b>NFTMinterDapp</b>
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          {WALLET ? (
            <WalletConnected setWallet={setWallet} />
          ) : (
            <NoWallet setWallet={setWallet} />
          )}
        </Box>
        <Box>
          <WalletInformation />
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    WALLET: state.WalletReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWallet: (wallet) => dispatch(setWallet(wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
