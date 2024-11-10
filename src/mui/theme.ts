import { createTheme } from "@mui/material";
import { faIR } from "@mui/x-data-grid/locales";

export const theme = createTheme(
  {
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
  },
  faIR,
);
