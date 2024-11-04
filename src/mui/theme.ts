import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "IRANSansX ,Roboto",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#114a86",
        },
      },
    },
  },
});
