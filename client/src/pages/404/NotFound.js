import { Home } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">My bad!</Typography>
      <Typography variant="h4">We didn't find page you looking for</Typography>
      <IconButton component={Link} to="/">
        <Home sx={{ fontSize: "40px" }} />{" "}
        <span style={{ marginLeft: "10px" }}>Go back Home</span>
      </IconButton>
    </Box>
  );
};

export default NotFound;
