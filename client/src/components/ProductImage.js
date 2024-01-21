import React, { useState } from "react";
import { Box } from "@mui/material";

const ProductImage = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  return (
    <div className="product-image-wrapper">
      {/*MAIN EMAIGE*/}
      <Box
        className="image-wrapper"
        sx={{
          width: "100%",
          height: { xs: "200px", md: "400px" },
          backgroundImage: `url(${mainImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
      >
        <div className="color-variant">
          <div
            style={{ width: "2rem", height: "2rem", backgroundColor: " red" }}
          ></div>
          <div
            style={{ width: "2rem", height: "2rem", backgroundColor: "blue" }}
          ></div>
        </div>
      </Box>
      <div
        className="otherImages"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${images.length}, 1fr)`,
          gridColumnGap: "0.2rem",
          marginTop: "10px",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setMainImage(image)}
            style={{
              width: { xs: "100%", md: "100px" },
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              borderRadius: "4px",
              border:
                image === mainImage
                  ? "3px solid var(--primary-color)"
                  : "1px solid var(--lightGray-color)",
              height: "10vh",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
