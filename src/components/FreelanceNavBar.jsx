import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, Button, Typography, Box, Toolbar } from "@mui/material";
import {  IconButton } from "@mui/material";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const breakpoints = [576, 768, 992, 1200];
// const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
const mq = breakpoints.map(
  (bp) => `@media only screen and (max-width: ${bp}px)`
);

const navStyle = css`
 
  ${mq[1]} {
    font-size: 10px;
    widht:10%;
    
  }
`;

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
              sx={{ flexGrow: 1, textAlign: "left",fontSize:{
                xs:"0.9rem",
                sm:"1.5rem"
              } }}
            >
               <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>
              My Posted Jobs
            </Typography>
            <Button variant="contained" onClick={handleModalOpen} sx={{ width:{
                          xs:'30%',
                          sm:'20%'
                        },height:{
                          xs:'100%'
                        } }}>
                           <Typography
              variant="h5"
              component="p"
              sx={{ flexGrow: 1, textAlign: "left",fontSize:{
                xs:"0.9rem",
                sm:"1.5rem"
              } }}
            >

              Post Job
            </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};
export default FreelanceNavBar;
