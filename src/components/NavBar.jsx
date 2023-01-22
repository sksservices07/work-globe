import * as React from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#474747",
          // boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        },
      },
    },
  },
});

const NavBar = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          // boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <img
              src={require("../img/logo192.png")}
              alt="Logo"
              height={30}
              width={30}
            />
            <Typography
              variant="h6"
              component="p"
              sx={{ flexGrow: 1, textAlign: "left", ml: 2 }}
            >
              WorkGLOBE
            </Typography>
            <IconButton size="large" aria-label="home" color="inherit">
              <HomeIcon />
            </IconButton>

            <Link to="/messages">
              <IconButton size="large" aria-label="contact">
                <EmailIcon sx={{ color: "white !important" }} />
              </IconButton>
            </Link>

            <IconButton size="large" aria-label="about" color="inherit">
              <ConnectButton accountStatus="address" chainStatus="icon" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default NavBar;
