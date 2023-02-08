import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";

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

  const [formInput, updateFormInput] = useState({
    companyName: "",
    position: "",
    experience: "",
    projDescription: "",
    location: "",
    salary: "",
  });

  const validate = (data) => {
    if (
      data?.companyName &&
      data?.position &&
      data?.projDescription &&
      data?.experience &&
      data?.location &&
      data?.salary
    ) {
      return true;
    } else {
      toast.error("There are some incomplete fields in your submission!", {
        icon: "ℹ️",
      });
      return false;
    }
  };

  const jobPost = async () => {
    // validate
    if (!validate(formInput)) return;

    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    console.log("hi");
    console.log(getConfigByChain(chain?.id)[0].contractProxyAddress);
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    console.log("formInput", formInput);

    const tx = await contract.addJob(
      formInput.companyName,
      formInput.position,
      formInput.projDescription,
      formInput.experience,
      formInput.location,
      formInput.salary
    );
    toast.success("Creating block... Please Wait", { icon: "👏" });
    const receipt = await provider
      .waitForTransaction(tx.hash, 1, 150000)
      .then(() => {
        toast.success("Job post Sucessful !!");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-center" reverseOrder="false" />
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
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  companyName: e.target.value,
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
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  position: e.target.value,
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
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  projDescription: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Experience (in years)"
              variant="outlined"
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  experience: e.target.value,
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
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  location: e.target.value,
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
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  salary: e.target.value,
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
