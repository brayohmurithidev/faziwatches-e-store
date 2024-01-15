import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import CounterIcon from "./CounterIcon";

const Header = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  return (
    <div className="header-section">
      <div className="header-wrapper">
        <div className="header-logo">
          <h3>
            <span>F</span>AZI<span>W</span>ATCHES
          </h3>
        </div>
        <div className="header-icons">
          <CounterIcon />
        </div>
        <div className="header-search">
          <input type="text" placeholder="Search products..." />
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
