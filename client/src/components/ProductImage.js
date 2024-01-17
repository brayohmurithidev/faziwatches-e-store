import React, { useState } from "react";
import img1 from "../assets/images/black_men_watch.png";
import img2 from "../assets/images/1.png";
import img3 from "../assets/images/gallery-4.png";
import img4 from "../assets/images/gallery-3.png";
import img5 from "../assets/images/gallery-6.jpg";
import { Box } from "@mui/material";

const images = [img1, img2, img3, img4, img5];

const ProductImage = () => {
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
            onClick={() => setMainImage(image)}
            style={{
              width: "100%",
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              borderRadius: "4px",
              border:
                image === mainImage
                  ? "3px solid var(--desertSand-color)"
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
