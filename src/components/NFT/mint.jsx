import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@mui/material";
import ChangeCircle from "@mui/icons-material/ChangeCircle";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import createRandomPicsumAddress from "@utils/image";
import mint from "@blockchain/NFT/mint";

function NFTMintModal({ WALLET }) {
  const [open, setOpen] = useState(false);
  const [nftData, setNFTData] = useState({
    name: "",
    file: createRandomPicsumAddress(),
    price: "",
  });

  // Snackbar state variables
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (!WALLET) {
      setOpen(false);
    }
  }, [WALLET]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNFTData({ ...nftData, [name]: value });
  };

  const handleImageChange = (event) => {
    const newImage = createRandomPicsumAddress();
    setNFTData({ ...nftData, file: newImage });
  };

  const handleAddNFT = () => {
    mint(WALLET, nftData.name, nftData.file, nftData.price)
      .then(() => {
        setSnackbarSeverity("success");
        setSnackbarMessage("NFT minted successfully.");
        setSnackbarOpen(true);
        clearData(); // Optionally clear the form here
      })
      .catch((error) => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error minting NFT.");
        setSnackbarOpen(true);
      });
  };

  const clearData = () => {
    setNFTData({
      name: "",
      file: createRandomPicsumAddress(),
      price: "",
    });
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{ float: "right", fontSize: 18 }}
        onClick={handleOpen}
      >
        MINT
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
        <DialogTitle fontWeight={500} fontSize={24}>
          Mint NFT
        </DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          style={{ position: "absolute", top: "10px", right: "25px" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000} // Adjust the duration as needed (in milliseconds)
            onClose={() => setSnackbarOpen(false)}
            sx={{ position: "relative", left: "0!important", top:0 }}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={nftData.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="Price"
            name="price"
            value={nftData.price}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Image"
            name="image"
            value={nftData.file}
            onChange={(e) => e.preventDefault()}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    component="label"
                    onClick={handleImageChange}
                    color="primary"
                  >
                    <ChangeCircle />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {nftData.file && (
            <img
              src={nftData.file}
              alt="Preview"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={clearData} color="primary" variant="outlined">
            Clear
          </Button>
          <Button onClick={handleClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAddNFT} color="success" variant="contained">
            Mint
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    WALLET: state.WalletReducer,
  };
};

export default connect(mapStateToProps)(NFTMintModal);
