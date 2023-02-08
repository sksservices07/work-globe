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

function Register() {
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState([]);
  const { chain } = useNetwork();
  const [formInput, updateFormInput] = useState({
    name: "",
    typeOfRegistration: "",
    City: "",
  });
  const { address } = useAccount();

  const validate = (data) => {
    if (data?.name && data?.typeOfRegistration && data?.City) {
      return true;
    } else {
      toast.error("There are some incomplete fields in your submission!", {
        icon: "ℹ️",
      });
      return false;
    }
  };

  const registerProfile = async () => {
    // validate
    if (!validate(formInput)) return;

    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const tx = await contract.registerProfiles(
      formInput.name,
      formInput.typeOfRegistration,
      formInput.City
    );
    toast.success("Saving Your Details... Please Wait", { icon: "👏" });
    const receipt = await provider
      .waitForTransaction(tx.hash, 1, 150000)
      .then(() => {
        toast.success("Congrats !! registration Done");
        navigate("/");
      });
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder="false" />
      <ThemeProvider theme={theme}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              Tell Us About YourSelf
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  name: e.target.value,
                }))
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="I am an Employer/I am a Freelancer"
              variant="outlined"
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  typeOfRegistration: e.target.value,
                }))
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  City: e.target.value,
                }))
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={4} />
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                registerProfile();
              }}
            >
              Register Me
            </Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default Register;
