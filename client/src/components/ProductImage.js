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
          height: { xs: "200px", md: "500px" },
          backgroundImage: `url(${mainImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50%",
          borderRadius: "20px",
        }}
      ></Box>
      <div
        className="otherImages"
        style={{
          display: "flex",
          gap: "10px",
          overflow: "hidden",
          // gridTemplateColumns: `repeat(100px, 1fr)`,
          // gridColumnGap: "0.2rem",
          marginTop: "10px",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setMainImage(image)}
            style={{
              width: "100px",
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "50%",
              border: image === mainImage && "2px solid var(--primary-color)",
              height: "100px",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
