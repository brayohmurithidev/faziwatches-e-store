import React, { useState } from "react";
import { Box, Grid, IconButton, Input } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const Increment = () => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <IconButton
            onClick={() =>
              value === 0 ? setValue(value) : setValue(parseInt(value) - 1)
            }
          >
            <Remove sx={{ color: "#fff" }} />
          </IconButton>
        </Grid>{" "}
        <Grid item xs={4}>
          {" "}
          <Input
            sx={{
              backgroundColor: "#fff",
              boxSizing: "border-box",
              border: "none",
              textAlign: "center",
            }}
            size="small"
            onChange={(e) => setValue(e.target.value)}
            type="number"
            value={value}
          />
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={() => setValue(parseInt(value) + 1)}>
            <Add sx={{ color: "#fff" }} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Increment;
