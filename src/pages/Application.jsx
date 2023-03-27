import * as React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Buffer } from "buffer";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";
import toast, { Toaster } from "react-hot-toast";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ButtonBase, Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { create as ipfsHttpClient } from "ipfs-http-client";
import ApplicationNavbar from "../components/ApplicationNavbar";
import EmployerNavBar from "../components/EmployerNavBar";
import NavBar from "../components/NavBar";
import RingLoader from "react-spinners/RingLoader";

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

const projectId = "2DkWK5numOIP1H7GyUZ3aEPhLXK";
const projectSecret = "9c669d03ed7813aae7dc0a32c5cfd386";
const projectIdAndSecret = `${projectId}:${projectSecret}`;
//const client = ipfsHttpClient("https://nftmarketcover.infura-ipfs.io:5001/api/v0")
const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64"
    )}`,
  },
});

const backgroundStyles = css`
background-color:#7FB4AD;
`;

function Application(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [cv, setCv] = React.useState();
  const [isLoading, setIsLoading] = useState(false);
  const { chain } = useNetwork();
  const [formInput, updateFormInput] = useState({
    // name: "",
    experience: "",
    fee: "",
    estimatedCompletionTime: "",
    location: "",
  });
  const { address } = useAccount();

  async function onChange(e) {
    const file = e.target.files[0];
    console.log("file", client);

    try {
      setIsLoading(true);
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      console.log("added is:", client);
      const url = `https://nftmarketcover.infura-ipfs.io/ipfs/${added.path}`;
      console.log(`File uploaded is: ${url}`);
      setIsLoading(false)
      setCv(url);
      // debugger;
    } catch (e) {
      console.log(`Error is: ${e}`);
    }
  }

  async function applyNow() {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    console.log(location.state.jobId);
    debugger;
    const tx = await contract.applyForJob(
      location.state.jobId,
      formInput.experience,
      formInput.fee,
      formInput.estimatedCompletionTime,
      formInput.location,
      cv
    );
    toast.success("Creating block... Please Wait", { icon: "👏" });
    const receipt = await provider
      .waitForTransaction(tx.hash, 1, 150000)
      .then(() => {
        navigate("/");
        toast.success("Application Done !!");
      });
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder="false" />
      <ThemeProvider theme={theme}>
        <Grid container spacing={3} justify="center" sx={{backgroundColor:"#e8faf8"}}>
          <Grid item xs={12}>
            <NavBar />
            {/* <Typography variant="h6" component="h2">
              Apply for Position at {location.state.companyName} for &nbsp;
              {location.state.position}
            </Typography>  */}
            <ApplicationNavbar />
          </Grid>

          {/* <Box width="30%" />
          <Grid item xs={4}>
            <TextField


              sx={{
                '& label': { paddingLeft: (theme) => theme.spacing(2) },
                '& input': { paddingLeft: (theme) => theme.spacing(3.5) },
                '& fieldset': {
                  paddingLeft: (theme) => theme.spacing(2.5),
                  borderRadius: '30px',boxShadow:5,height:60
                }, width:{
                  xs:"40vw",
                  sm:'30vw'
                },
              }}
              id="outlined-basic"
              label="Your Name"
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

          <Box width="30%" /> */}
          <Box width="30%" />
          <Grid item xs={4}>
            <TextField
             sx={{
               '& label': { paddingLeft: (theme) => theme.spacing(2) },
               '& input': { paddingLeft: (theme) => theme.spacing(3.5) },
               '& fieldset': {
                 paddingLeft: (theme) => theme.spacing(2.5),
                 borderRadius: '30px',boxShadow:5,height:60
                 
               }, width:{
                xs:"40vw",
                sm:'30vw'
              },
             }}
              id="outlined-basic"
              label="Your Experience"
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
          
          <Box width="30%" />
          <Box width="30%" />
          <Grid item xs={4}>
            <TextField
             sx={{
               '& label': { paddingLeft: (theme) => theme.spacing(2) },
               '& input': { paddingLeft: (theme) => theme.spacing(3.5) },
               '& fieldset': {
                 paddingLeft: (theme) => theme.spacing(2.5),
                 borderRadius: '30px',boxShadow:5,height:60
                 
               },
             }}
              id="outlined-basic"
              label="Fee"
              variant="outlined"
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  fee: e.target.value,
                }))
              }
              fullWidth
            />
          </Grid>

          <Box width="30%" />
          <Box width="30%" />
          <Grid item xs={4}>
            <TextField
             sx={{
               '& label': { paddingLeft: (theme) => theme.spacing(2) },
               '& input': { paddingLeft: (theme) => theme.spacing(3.5) },
               '& fieldset': {
                 paddingLeft: (theme) => theme.spacing(2.5),
                 borderRadius: '30px',boxShadow:5,height:60
                 
               },
             }}
              id="outlined-basic"
              label="Estimated Completion Time in days"
              variant="outlined"
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  estimatedCompletionTime: e.target.value,
                }))
              }
              fullWidth
            />
          </Grid>

          <Box width="30%" />
          <Box width="30%" />
          <Grid item xs={4}>
            <TextField
             sx={{
               '& label': { paddingLeft: (theme) => theme.spacing(2) },
               '& input': { paddingLeft: (theme) => theme.spacing(3.5) },
               '& fieldset': {
                 paddingLeft: (theme) => theme.spacing(2.5),
                 borderRadius: '30px',boxShadow:5,height:60
               }, width:{
                xs:"40vw",
                sm:'30vw'
              },
             }}
              id="outlined-basic"
              label="City"
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

          <Box width="30%" />
          <Grid item xs={12}>
            <input type="file" name="Asset" onChange={onChange} />
          </Grid>

          <Box width="30%" />
          <Grid item xs={4} />

          <Box width="30%" />
          <Box width="30%" />
          <Grid item xs={4}>
            {isLoading == true ? (
              <>
                <RingLoader color={"#000000"} size={50} /> uploading...
              </>
            ) : (
              <Button
                style={{
                  maxWidth: "200px",
                  maxHeight: "80px",
                  minWidth: "200px",
                  minHeight: "80px",
                }}
                variant="contained"
                onClick={() => applyNow()}
              >
                Apply
              </Button>
            )}
          </Grid>
          <Box width="30%" />

          <Grid item xs={4} />
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default Application;
