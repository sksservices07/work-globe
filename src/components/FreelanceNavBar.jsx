import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, Button, Typography, Box, Toolbar } from "@mui/material";
import {  IconButton } from "@mui/material";

import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#7FB4AD",
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
  
  const navigate = useNavigate();
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
               <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>
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
