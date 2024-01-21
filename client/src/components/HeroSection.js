import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-wrapper">
        <div className="hero-section-content">
          <h1>
            GRAND <br /> SALE
          </h1>
          <h5>__ UP TO 40% OFF __</h5>
          <Link to="/shop">
            <Button
              className="btn"
              variant="contained"
              sx={{
                color: "#fff",
                backgroundColor: "var(--accent-color)",
              }}
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
