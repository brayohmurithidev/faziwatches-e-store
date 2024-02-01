import React from "react";
import { Box, Typography } from "@mui/material";
import SearchForm from "./SearchForm";

const Header = () => {
  return (
    <div className="header-section">
      <Box className="header-wrapper" sx={{ alignItems: { md: "start" } }}>
        <Box className="header-logo" sx={{ alignText: "right" }}>
          <Typography
            className="logo"
            sx={{
              fontSize: { md: "2rem", xs: "2rem" },
              marginLeft: { md: "30px" },
            }}
          >
            <span>F</span>
            <span>A</span>
            <span>Z</span>
            <span>I</span>
            <span>W</span>
            <span>A</span>
            <span>T</span>
            <span>C</span>
            <span>H</span>
            <span>E</span>
            <span>S</span>
          </Typography>
        </Box>
        <Box sx={{ display: { md: "none" } }}>
          <SearchForm
            btnName="Search"
            type="text"
            placeholder="Search products..."
          />
        </Box>
      </Box>
    </div>
  );
};

export default Header;
