import * as React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";

import { ButtonBase, Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import EmployerNavBar from "../components/EmployerNavBar";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#1fe47a",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "#1fe47a",
          },
        },
      },
    },
  },
});

function Profile() {
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState([]);
  const { chain } = useNetwork();
  const [myProfile, setMyProfile] = useState([]);
  const { address } = useAccount();

  useEffect(()=>{
    getMyProfile()
  },[address,chain])

  const getMyProfile = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const tx = await contract.getMyProfile();
    console.log("tx",tx)
    debugger
    setMyProfile(tx)
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder="false" />
      <ThemeProvider theme={theme}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              My Profile
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <h1>Name: {myProfile.name}</h1>
          </Grid>
          
          <Grid item xs={12}>
            <h6>I am a {myProfile.typeOfAccount}</h6>
          </Grid>
          <Grid item xs={12}>
            <h6>City: {myProfile.myAddress}</h6>
          </Grid>

          <Grid item xs={4} />
          <Grid item xs={4}>
            
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default Profile;
