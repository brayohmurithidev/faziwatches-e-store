import React from "react";
import { Button } from "@mui/material";

const CountdownSale = () => {
  return (
    <div className="countdown-sale section">
      <div className="countdown-sale-content">
        <div>
          <h1>
            <h6 style={{ fontSize: "12px" }}>SALE UP TO 15% OFF</h6>PLATINUM
            DESIGN
          </h1>
          <p>Give yourself a more vibrant look </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <h3>
                464
                <span>Days</span>
              </h3>
              <h3>
                11
                <span>Hours</span>
              </h3>
              <h3>
                46
                <span>Minutes</span>
              </h3>
              <h3>
                22
                <span>Seconds</span>
              </h3>
            </div>
          </div>
          <Button
            className="btn"
            sx={{
              backgroundColor: "var(--desertSand-color)",
              color: "var(--white-color)",
              marginTop: " 20px",
            }}
            variant="contained"
          >
            Shop Now
          </Button>
        </div>
      </div>

      {/*<img src={elegance} height="40vh" alt="elegance" />*/}
    </div>
  );
};

export default CountdownSale;
