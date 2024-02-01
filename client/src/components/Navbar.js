import { Box, IconButton, ListItem } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import CounterIcon from "./CounterIcon";
import SearchForm from "./SearchForm";

const Navbar = ({ menus, setOpen }) => {
  return (
    <div className="navbarWrapper">
      <IconButton
        sx={{ display: { md: "none" } }}
        className="hamburger-icon"
        onClick={() => setOpen(true)}
      >
        <Menu sx={{ color: "var(--white-color)" }} />
      </IconButton>

      <Box
        sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
        className="list"
      >
        {menus?.map((menu, index) => (
          <ListItem className="navMenu-item" key={index}>
            <NavLink
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
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <SearchForm
          btnName="Search"
          type="text"
          placeholder="Search products..."
        />
      </Box>
      <Box>
        <CounterIcon />
      </Box>
    </div>
  );
};

export default Navbar;
