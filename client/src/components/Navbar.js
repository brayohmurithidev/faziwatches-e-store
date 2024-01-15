import React from "react";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import { Menu } from "@mui/icons-material";

const Navbar = ({ menus, setOpen }) => {
  return (
    <div className="navbarWrapper">
      <IconButton className="hamburger-icon" onClick={() => setOpen(true)}>
        <Menu sx={{ color: "var(--white-color)" }} />
      </IconButton>

      <div className="list">
        {menus?.map((menu, index) => (
          <ListItem key={index}>
            <ListItemText primary={menu.name} />
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
