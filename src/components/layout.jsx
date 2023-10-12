import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";

const Layout = ({ children, title }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </React.Fragment>
  );
};

export default Layout;
