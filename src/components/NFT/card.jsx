import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

const NFTCard = ({ nftData }) => {
  const { name, fileReference, price } = nftData;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardMedia
          component="img"
          alt={name}
          height="200"
          image={fileReference}
          title={name}
        />
        <CardContent>
          <Typography variant="h2" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Price: {price} ETH
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NFTCard;
