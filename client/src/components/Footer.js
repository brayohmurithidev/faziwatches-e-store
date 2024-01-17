import React from "react";
import { Box, Divider, IconButton } from "@mui/material";
import {
  Call,
  Facebook,
  Instagram,
  Mail,
  Pinterest,
  Twitter,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-top">
        <div className="footer-services">
          <h4 style={{ marginBottom: "10px" }}>OUR SERVICES</h4>
          <Divider />
          <div>
            <p>About</p>
            <p>Shop</p>
            <p>Beauty </p>
            <p>Contact</p>
          </div>
        </div>
        <div className="footer-information">
          <Box sx={{ padding: "10px" }}>
            <IconButton sx={{ color: "var(--white-color)" }}>
              <Mail
                sx={{
                  fontSize: 40,
                  borderRight: "2px solid var(--lightGray-color)",
                  paddingRight: " 10px",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "10px",
                }}
              >
                SIGN UP TO NEWSLETTER
              </span>
            </IconButton>
          </Box>
          <Box sx={{ padding: "10px" }}>
            <div className="header-search">
              <input type="email" placeholder="Submit your email..." />
              <button className="btn">Subscribe</button>
            </div>
          </Box>
        </div>
        <div className="footer-contacts">
          <h4>FAZIWATCHES.MART</h4>
          <div>
            <Call sx={{ fontSize: 30 }} />
            <div className="contact-details">
              <p style={{ fontSize: "12px" }}>Got Questions? Call us 24/7</p>
              <h5>+254706134387</h5>
            </div>
          </div>
          <Box sx={{ padding: "10px" }}>
            <IconButton>
              <Facebook sx={{ fontSize: 30, color: "var(--white-color)" }} />
            </IconButton>
            <IconButton>
              <Instagram sx={{ fontSize: 30, color: "var(--white-color)" }} />
            </IconButton>
            <IconButton>
              <Pinterest sx={{ fontSize: 30, color: "var(--white-color)" }} />
            </IconButton>
            <IconButton>
              <Twitter sx={{ fontSize: 30, color: "var(--white-color)" }} />
            </IconButton>
          </Box>
        </div>
      </div>
      {/*    Mid footer*/}
      <div className="footer-mid"></div>
      <div className="footer-bottom">
        <p>
          Copyright &copy; {new Date().getFullYear()} <span>Fazitech</span>. All
          Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
