import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/brand/logo 250 x 250.png";
import { Link } from "react-router-dom";
import "./footer.css";
import { Circle, Facebook, Instagram, YouTube } from "@mui/icons-material";

const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--footer-bg-color)",
        color: "var(--footer-text-color)",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Grid container spacing={2}>
        {/* GRID 1- LOGO, AND SOCIAL MEDIA ICONS */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ alignSelf: "start" }}
            width="100px"
            src={logo}
            alt="Beauty Line"
          />
          <Typography variant="body1">
            Always feel comfortable through your look, smell and attractive
            feel.
          </Typography>
          {/* SOCIAL MEDIA ICONS */}
          <Box sx={{ alignSelf: "start" }}>
            <IconButton>
              <Facebook sx={{ fontSize: 40, color: "#fff" }} />
            </IconButton>
            <IconButton>
              <Instagram sx={{ fontSize: 40, color: "#fff" }} />
            </IconButton>
            <IconButton>
              <YouTube sx={{ fontSize: 40, color: "#fff" }} />
            </IconButton>
          </Box>
        </Grid>
        {/* space */}
        <Grid item md={3}></Grid>
        {/* HELPFUL LINKS */}
        <Grid item container xs={12} md={6} justifyContent="end" spacing={2}>
          <Grid
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            item
            xs={4}
            md={3}
          >
            <Typography variant="h6">Services</Typography>
            <Typography variant="body1">
              <Link className="link" to="#">
                Blogs
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link className="link" to="#">
                Resale
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link className="link" to="#">
                Delivery
              </Link>
            </Typography>
          </Grid>
          <Grid
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            item
            xs={4}
            md={3}
          >
            <Typography variant="h6">Information</Typography>
            <Typography variant="body1">
              <Link className="link" to="#">
                Signup
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link className="link" to="#">
                Shipping Policy
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link className="link" to="#">
                Newsletter
              </Link>
            </Typography>
          </Grid>
          <Grid
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            item
            xs={4}
            md={3}
          >
            <Typography variant="h6">Platform</Typography>
            <Typography variant="body1">
              <Link className="link" to="#">
                Contact
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link className="link" to="#">
                Products
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link className="link" to="#">
                Collection
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              All rights reserved &copy; {getCurrentYear()}{" "}
              <Link to="/">Fazitech</Link>
            </Typography>
          </Grid>

          <Grid
            sx={{ display: "flex", justifyContent: { md: "end", xs: "start" } }}
            item
            xs={12}
            md={6}
          >
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: "20px" }}
            >
              <span>Terms and Conditions</span> <Circle sx={{ fontSize: 15 }} />
              <span>Privacy Policy</span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
