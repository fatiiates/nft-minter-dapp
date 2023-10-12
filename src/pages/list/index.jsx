import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Skeleton, Typography, Box } from "@mui/material";
import NFTCard from "@components/NFT/card";
import Pagination from "@components/pagination";
import { LISTING_METHODS } from "@constants";
import ListingMethods from "@components/listingMethods";
import Head from "@components/NFT/head";
import axios from "axios";

const List = ({ WALLET, LISTING_METHOD }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [nfts, setNFTs] = useState([]);
  const [loader, setLoader] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const loadNFTs = () => {
    setLoader(true);

    axios
      .get("/api/list", {
        params: {
          page: page,
          rowsPerPage: rowsPerPage,
          method: LISTING_METHODS[LISTING_METHOD],
          wallet: WALLET,
        },
      })
      .then((response) => {
        setNFTs(response.data.nfts);
        setTotal(response.data.total);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setNFTs([]);
        setTotal(0);
        setPage(1);
      });
  };

  useEffect(() => {
    if (page === 1) loadNFTs();
    else setPage(1);
  }, [WALLET, LISTING_METHOD]);

  useEffect(() => {
    loadNFTs();
  }, [page, rowsPerPage]);

  return (
    <Grid container>
      <Head />

      <Grid spacing={2} padding={0} margin={0} paddingRight={2} container>
        {loader ? (
          // Show loading skeletons while data is being fetched
          Array(rowsPerPage)
            .fill()
            .map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rectangular" width="100%" height={250} />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="80%" />
              </Grid>
            ))
        ) : nfts.length > 0 ? (
          // Show NFT cards if there are NFTs
          nfts.map((nft, index) => <NFTCard key={index} nftData={nft} />)
        ) : (
          // Show empty case UI if there are no NFTs
          <Typography
            variant="h2"
            textAlign={"center"}
            sx={{ margin: "0 auto" }}
          >
            There is no NFTs to display
          </Typography>
        )}
      </Grid>

      {!loader && (
        <React.Fragment>
          <Box
            sx={{
              minHeight: {
                "@media (min-width: 600px) and (max-width: 716px)": {
                  minHeight: "182px", // Height for screens between xs and sm
                },
                xs: "152px",
                sm: "112px",
              },
              width: "100%",
            }}
          ></Box>
          <Grid
            container
            justifyContent={"center"}
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              borderTop: "1px solid #ccc",
              padding: "5px 0",
              backgroundColor: "white",
              boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 2,
              width: "100%",
            }}
          >
            {total > 0 && (
              <Pagination
                count={total > 0 ? Math.ceil(total / rowsPerPage) : 100}
                page={page}
                onChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
            <ListingMethods />
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    WALLET: state.WalletReducer,
    LISTING_METHOD: state.ListingMethodReducer,
  };
};

export default connect(mapStateToProps)(List);
