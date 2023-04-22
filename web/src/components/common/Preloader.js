import {Box, CircularProgress} from "@mui/material";
import React from "react";

const preloaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh"
};
export const Preloader = () =>
    <Box sx={preloaderStyle}>
      <CircularProgress/>
    </Box>;
