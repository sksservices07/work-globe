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
          backgroundColor: "#474747",
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
      <Box
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
              height={30}
              width={30}
            />
            </Link>
            <Typography
              variant="h6"
              component="p"
              sx={{ flexGrow: 1, textAlign: "left", ml: 2,color:"white !important" }}
              // style={Textstyles}
            >
              HuntForLancer
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
            <Link to="/lancers" style={{ textDecoration: 'none' }}>
              <IconButton
                size="small"
                aria-label="contact"
                sx={{ color: "white !important" }}
              >
                <LaptopMacIcon sx={{ color: "white !important",m:1 }} />
                Lancers
                {/* Lancers */}
              </IconButton>
            </Link>
            {/* <Link to="/messages" style={{ textDecoration: 'none' }}>
              <IconButton
                size="small"
                aria-label="contact"
                sx={{ color: "white !important" }}
              >
                <EmailIcon alt="Message" sx={{ color: "white !important",m:1 }} />
                Messages
              </IconButton>
            </Link> */}
            {isRegistered && (
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <IconButton
                  size="small"
                  aria-label="profile"
                  color="inherit"
                  sx={{ color: "white !important" ,m:1 }}
                >
                  <ProfileIcon sx={{ color: "white !important" }} />
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
              <ConnectButton accountStatus="address" chainStatus="icon" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default NavBar;
