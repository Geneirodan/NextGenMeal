import {Box, CircularProgress} from "@mui/material";
import React from "react";

export const Preloader = props => {
  const preloaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh"
  };
  return <Box sx={preloaderStyle}>
    <CircularProgress/>
  </Box>;
};
