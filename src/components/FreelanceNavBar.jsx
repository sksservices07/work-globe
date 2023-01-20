import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, Button, Typography, Box, Toolbar } from "@mui/material";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#474747",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#1fe47a",
          height: "50px",
          width: "200px",
          fontSize: "20px",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "#1fe47a",
          },
        },
      },
    },
  },
});

const FreelanceNavBar = (props) => {
  // const [modalOpen, setModalOpen] = React.useState(false);
  // const handleModalOpen = () => setModalOpen(true);
  // const handleModalClose = () => setModalOpen(false);
  const { handleModalOpen } = props;
  return (
    <ThemeProvider theme={theme}>
      <Box component="nav" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h5"
              component="p"
              sx={{ flexGrow: 1, textAlign: "left", ml: 2 }}
            >
              My Posted Jobs
            </Typography>
            <Button variant="contained" onClick={handleModalOpen}>
              Post Job
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};
export default FreelanceNavBar;
