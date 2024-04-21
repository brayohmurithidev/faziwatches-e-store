import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Person, Search, ShoppingCart } from "@mui/icons-material";
// Import logo
import logo from "../../assets/brand/header-logo.png";
import "./header.css";
import { Link, NavLink } from "react-router-dom";

const pages = [
  {
    menu: "Featured",
    path: "/featured",
  },
  {
    menu: "Best Selling",
    path: "/best-selling",
  },
  {
    menu: "About",
    path: "/about",
  },
  {
    menu: "Contact us",
    path: "/contact",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const logofn = () => {
  return <img width="100px" src={logo} alt="Beauty Line" />;
};

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{ backgroundColor: "#fff", marginBottom: "40px" }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* MD + LOGO */}
          <Box
            component={Link}
            to="/"
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
            }}
          >
            {logofn()}
          </Box>

          {/* small devices hamburger */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="var(--text-color)"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.menu} onClick={handleCloseNavMenu}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "navlink active" : "navlink"
                    }
                    to={page.path}
                  >
                    {page.menu}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* END OF SMALL DEVICES HAMBURGER */}

          {/* small devices logo */}
          <Box
            sx={{
              mr: 5,
              display: { xs: "flex", md: "none" },
              justifySelf: "center",
              flexGrow: 2,
            }}
          >
            {logofn()}
          </Box>

          {/*  PAGES  LINKS*/}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", gap: "20px" },
            }}
          >
            {pages.map((page) => (
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "navlink")}
                to={page.path}
              >
                {page.menu}
              </NavLink>
            ))}
          </Box>

          {/* ICONS */}
          <Box sx={{ flexGrow: 0, display: "flex", gap: "20px" }}>
            <IconButton sx={{ p: 0 }}>
              <Search
                sx={{
                  fontSize: { xs: "30px", md: "40px" },
                  color: "var(--text-color)",
                }}
              />
            </IconButton>
            <Box>
              <IconButton sx={{ p: 0 }}>
                <ShoppingCart
                  sx={{
                    fontSize: { xs: "30px", md: "40px" },
                    color: "var(--text-color)",
                    position: "relative",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    position: "absolute",
                    top: -15,
                    color: "var(--primary-color)",
                    fontWeight: 900,
                  }}
                >
                  4
                </Typography>
              </IconButton>
            </Box>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Person
                  sx={{
                    fontSize: { xs: "30px", md: "40px" },
                    color: "var(--text-color)",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
