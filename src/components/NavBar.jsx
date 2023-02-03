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
import ProfileIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";

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
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    checkRegistration();
  }, [chain, address]);

  const checkRegistration = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const tx = await contract.checkRegistration();
    setIsRegistered(tx);
  };
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
            <Link to="/">
              <IconButton size="large" aria-label="home" color="inherit">
                <HomeIcon sx={{ color: "white !important" }} />
              </IconButton>
            </Link>

            <Link to="/messages">
              <IconButton size="large" aria-label="contact">
                <EmailIcon sx={{ color: "white !important" }} />
              </IconButton>
            </Link>
            {isRegistered && (
              <Link to="/profile">
                <IconButton size="large" aria-label="profile" color="inherit">
                  <ProfileIcon sx={{ color: "white !important" }} />
                </IconButton>
              </Link>
            )}
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
