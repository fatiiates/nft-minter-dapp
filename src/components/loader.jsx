import React from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";

import MetaMaskLogo from "@assets/metamask.svg";
import Image from "next/image";

function Loader({ open, error }) {
  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 9999,
  };

  const innerBoxStyle = {
    textAlign: "center",
  };

  const logoStyle = {
    width: "80px",
    height: "80px",
    transition: "transform 0.5s linear",
    transform: "rotate(360deg)",
    animation: "spin 2s linear infinite",
    marginBottom: "16px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    open && (
      <Box sx={containerStyle}>
        <Box sx={innerBoxStyle}>
          <Image src={MetaMaskLogo} alt="Metamask Logo" style={logoStyle} priority={true} />
          <Typography variant="h4" sx={{ marginTop: "16px" }} gutterBottom>
            Loading...
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginTop: "16px" }}>
              <AlertTitle sx={{textAlign: "left"}} >Error</AlertTitle>
              {error}
            </Alert>
          )}
        </Box>
      </Box>
    )
  );
}

export default Loader;
