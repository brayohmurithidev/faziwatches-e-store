import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#5e3b00" },
    secondary: { main: "#FFD700" },
  },
  components: {
    MuiSelect: {
      "&:before": {
        borderColor: "#fff",
      },
      "&:after": {
        borderColor: "#fff",
      },
      icon: {
        fill: "#fff",
      },
    },
  },
});
