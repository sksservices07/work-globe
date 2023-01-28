import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/Gateway.sol/Gateway.json"
import { useAccount, useNetwork } from "wagmi";

import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

const JobPostModal = (props) => {
  const { chain } = useNetwork();
  const {
    input,
    onRoleChange,
    onExperienceChange,
    
    handleModalClose,
  } = props;

  const  jobPost = async()=>{
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const tx = await contract.addJob(formInput.companyName,formInput.position,formInput.projDescription,formInput.experience,formInput.location,formInput.salary); 
  } 
  
  const [formInput, updateFormInput] = useState({
    companyName:"",
    position: "",
    experience: "",
    projDescription: "",
    location:"",
    salary: "",
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              Tell Us About The Project
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Name of your company"
              variant="outlined"
              onChange={(val) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  companyName: val,
                }))
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Name of the Position"
              variant="outlined"
              onChange={(val) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  position: val,
                }))
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Project Description"
              variant="outlined"
              multiline
              maxRows={Infinity}
              fullWidth
              onChange={(val) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  projDescription: val,
                }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Experience (in years)"
              variant="outlined"
              onChange={(val) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  experience: val,
                }))
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Location (City)"
              variant="outlined"
              onChange={(val) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  location: val,
                }))
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Salary"
              variant="outlined"
              fullWidth
              onChange={(val) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  salary: val,
                }))
              }
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                jobPost();
                handleModalClose();
              }}
            >
              Post Job
            </Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default JobPostModal;
