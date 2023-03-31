import * as React from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, IconButton,Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PaymentIcon from '@mui/icons-material/Payment';
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
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
          backgroundColor: "black", //e8faf8
          // position:"fixed",
          // boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        },
      },
    },
  },
});

// const Textstyles = {
//   textDecoration: 'none',
//   '&:hover': {
//     color: 'red'
//   }
// };

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
      <Grid 
      // container
      // xs={12} sm={12}
        component="nav"
        sx={{
          flexGrow: 1,
          // boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img
                src={require("../img/logo192.png")}
                alt="Logo"
                height={100}
                width={120}
              />
            </Link>

            <Typography
              variant="h6"
              component="p"
              sx={{ flexGrow: 1, textAlign: "left", ml: 2, color: "white !important" }}
            // style={Textstyles}
            >
              {/* HuntForLancer */}
            </Typography>

            {/* <Link to="/" style={{ textDecoration: 'none' }}>
              <IconButton
                size="small"
                aria-label="home"
                color="inherit"
                sx={{ color: "white !important" }}
              >
                <HomeIcon sx={{ color: "white !important" }} />
                Home
              </IconButton>
            </Link> */}
          
            <Link to="/payments" style={{ textDecoration: 'none' }}>
              <IconButton
                size="small"
                aria-label="payments-button"
                sx={{ color: "#65b885", borderRadius: "8px !important", m: 1 }}
              >
                <PaymentIcon sx={{ color: "#65b885", m: 1 }} />
                Payments
              </IconButton>
            </Link>

            <Link to="/lancers" style={{ textDecoration: 'none' }}>
              <IconButton
                size="small"
                aria-label="lancers-button"
                sx={{ color: "#65b885", borderRadius: "8px !important", m: 1 }}
              >
                <LaptopMacIcon sx={{ color: "#65b885", m: 1 }} />
                Lancers
                {/* Lancers */}
              </IconButton>
            </Link>
            {/* <Link to="/messages" style={{ textDecoration: 'none' }}>
              <IconButton
                size="small"
                aria-label="contact"
                sx={{ color: "#65b885" }}
              >
                <EmailIcon alt="Message" sx={{ color: "white !important",m:1 }} />
                Messages
              </IconButton>
            </Link> */}

            {isRegistered && (
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <IconButton
                  aria-label="profile-button"
                  color="inherit"
                  size="small"
                  sx={{ color: "#65b885", borderRadius: "8px !important", m: 1 }}
                >
                  <ProfileIcon sx={{ color: "#65b885", m: 1 }} />
                  Profile
                  {/* Profile */}
                </IconButton>
              </Link>
            )}
            <IconButton
              size="small"
              aria-label="about"
              color="inherit"
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
              }}
            >
              <ConnectButton accountStatus="address"   sx={{
                display: { xs: "2", sm: "2", md: "2" },
              }} chainStatus="icon" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Grid>
    </ThemeProvider>
  );
};

export default NavBar;
