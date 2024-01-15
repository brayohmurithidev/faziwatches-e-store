import React from "react";
import { Button } from "@mui/material";
import heroImg from "../assets/images/7.jpg";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-section-content">
        <h1>
          GRAND <br /> SALE
        </h1>
        <h5>__ UP TO 40% OFF __</h5>
        <Button
          variant="contained"
          sx={{
            color: "var(--black-color)",
            backgroundColor: "var(--white-color)",
          }}
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
