import React from "react";
import { Paper } from "@mui/material";

const HeroCard = (props) => {
  return (
    <Paper
      elevation={3}
      style={{
        backgroundColor: props.bgColor,
        backgroundImage: `url(${props.image1})`,
        color: props.color || "var(--white-color)",
      }}
      className="card-wrapper"
    >
      <div className="card-content">
        <h4>NEW COLLECTION</h4>
        <h6>
          <a style={{ color: props.color || "var(--white-color)" }} href="#">
            Shop Collection
          </a>
        </h6>
      </div>
    </Paper>
  );
};

export default HeroCard;
