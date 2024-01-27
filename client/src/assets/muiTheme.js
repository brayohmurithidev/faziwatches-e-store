import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FFD700" },
    secondary: { main: "#5e3b00" },
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