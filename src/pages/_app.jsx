import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider, connect } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/system";

import theme from "@styles/theme";
import "@styles/index.css";

import configureStore from "@/redux/configureStore";
import { setWallet } from "@redux/actions/entities/wallet";
import { setListingMethod } from "@redux/actions/entities/listingMethod";

import Loader from "@components/loader";

import { getWallet, isWalletExists } from "@/utils/cookies";
import { initContract } from "@/utils/contract";
import { metamaskValidation, subscribeToWalletChange } from "@/utils/metamask";

const store = configureStore();

const App = ({ Component, pageProps, setWallet }) => {
  const [loading, setLoading] = useState(true);
  const [readyToUse, setReadyToUse] = useState(false);
  const [error, setError] = useState(null);
  const [startTime, _] = useState(Date.now());

  const router = useRouter();

  useEffect(() => {
    initContract().catch((error) => {
      console.error("Error initializing contract:", error);
      setError(error);
    });

    if (!isWalletExists()) {
      router.push("/");
    }

    metamaskValidation()
      .then(() => {
        setReadyToUse(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        router.push("/");
      });

    subscribeToWalletChange(setWallet);

    setWallet(getWallet());
  }, []);

  useEffect(() => {
    if (readyToUse) {
      if (Date.now() - startTime < 500) {
        setTimeout(() => {
          setLoading(false);
        }, 500 - (Date.now() - startTime));
      } else setLoading(false);
    }
  }, [readyToUse, startTime]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className="App"
        minHeight="100vh"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Loader open={loading} error={error} />
        {!loading && !error && readyToUse && <Component {...pageProps} />}
      </Box>
    </ThemeProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWallet: (wallet) => dispatch(setWallet(wallet)),
    setListingMethod: (method) => dispatch(setListingMethod(method)),
  };
};

const ConnectedApp = connect(null, mapDispatchToProps)(App);

const AppWrapper = (props) => {
  return (
    <Provider store={store}>
      <ConnectedApp {...props} />
    </Provider>
  );
};

export default AppWrapper;
