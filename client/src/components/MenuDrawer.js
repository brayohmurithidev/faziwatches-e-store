import React from "react";
import { Home, Settings, Shop } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const MenuDrawer = ({ open, setOpen, menus }) => {
  return (
    <Drawer
      sx={{ display: { md: "none" } }}
      open={open}
      anchor={"left"}
      onClose={() => setOpen(false)}
    >
      <div style={{ width: "70vw" }}>
        {menus.map((menu, index) => (
          <>
            <ListItem button key={index}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
          </>
        ))}
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
