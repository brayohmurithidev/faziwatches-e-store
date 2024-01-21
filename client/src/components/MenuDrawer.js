import React from "react";

import { Drawer, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

const MenuDrawer = ({ open, setOpen, menus }) => {
  return (
    <Drawer
      sx={{
        display: { md: "none" },
        "& .MuiDrawer-paper": {
          backgroundColor: "var(--background-color)",
          // color: "var(--white-color)",
        },
      }}
      open={open}
      anchor={"left"}
      onClose={() => setOpen(false)}
    >
      <div style={{ width: "70vw" }}>
        {menus.map((menu, index) => (
          <ListItem key={index}>
            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) => {
                return isActive ? "link active" : "link";
              }}
              style={{}}
              to={menu.url}
            >
              {menu.name}
            </NavLink>
          </ListItem>
        ))}
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
