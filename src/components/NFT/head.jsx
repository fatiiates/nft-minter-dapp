import React from "react";
import { connect } from "react-redux";
import { Alert, Grid, Button, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NFTMint from "@components/NFT/mint";

const Head = ({ WALLET }) => {
  return (
    <React.Fragment>
      <Box
        sx={{
          minHeight: {
            xs: "132px",
            sm: "72px",
          },
          width: "100%",
        }}
      ></Box>
      <Grid
        container
        alignItems="center"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#fff",
          zIndex: 1,
          width: "100%",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        paddingTop={1}
        paddingBottom={1}
      >
        <Grid item xs={2} paddingLeft={1}>
          <a href="/">
            <Button
              variant="text"
              color="primary"
              sx={{ fontSize: 18, fontWeight: "bold" }}
              startIcon={
                <ArrowBackIcon style={{ fontSize: 22, fontWeight: "bold" }} />
              }
            >
              Back
            </Button>
          </a>
        </Grid>
        <Grid
          item
          xs={6}
          sm={8}
          lg={8}
          justifyContent={"center"}
          display={"flex"}
        >
          <Grid item display={{ xs: "none", sm: "flex" }}>
            <Alert severity="success">
              <Typography
                component="span"
                fontSize={"inherit"}
                display={{ xs: "none", md: "initial" }}
              >
                Connected:
              </Typography>{" "}
              {WALLET}
            </Alert>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          sm={2}
          lg={2}
          sx={{ position: "relative" }}
          paddingRight={1}
        >
          <NFTMint />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ marginTop: "20px" }}
          display={{ xs: "initial", sm: "none" }}
        >
          <Alert severity="success">{WALLET}</Alert>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    WALLET: state.WalletReducer,
  };
};

export default connect(mapStateToProps)(Head);
