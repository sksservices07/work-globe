import * as React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";

import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  ButtonBase,
  Button,
  Paper,
} from "@mui/material";
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

function Employer() {
  const [jobs, setJobs] = React.useState([]);
  const { chain } = useNetwork();
  const { address } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    getAllPostedJobs();
  }, [chain, address]);

  const getAllPostedJobs = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const tx = await contract.allJobs();
    console.log("tx", tx);
    setJobs(tx);
  };

  return (
    <>
    <NavBar/>
      <EmployerNavBar />
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, m: 2 }}>
          <Grid container spacing={2}>
            {jobs.map(
              (job) =>
                job.companyName != "" && (
                  <>
                    <Grid item xs={1} />
                    <Grid item xs={7}>
                      <ButtonBase>
                        <Paper
                          elevation={3}
                          sx={{
                            p: 2,
                            width: "40vw",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {/* <img
                        src={require(`../img/${job.logo}`)}
                        alt={job.logo}
                        height={100}
                        width={100}
                      /> */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              m: 2,
                            }}
                          >
                            <Typography
                              variant="h6"
                              component="p"
                              sx={{ color: "black" }}
                            >
                              {job.companyName}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              component="p"
                              sx={{ color: "black" }}
                            >
                              {job.position}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              component="p"
                              sx={{ textAlign: "left", ml: 1, color: "black" }}
                            >
                              {job.description}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              component="p"
                              sx={{ textAlign: "left", ml: 1, color: "black" }}
                            >
                              Required: {job.experience} years experience
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              component="p"
                              sx={{ textAlign: "left", ml: 1, color: "black" }}
                            >
                              City:{job.location}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              component="p"
                              sx={{ textAlign: "left", ml: 1, color: "black" }}
                            >
                              {job.salary} USD/Annum
                            </Typography>
                          </Box>
                        </Paper>
                      </ButtonBase>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{ width: "80%", p: 2 }}
                        onClick={() =>
                          navigate("/application", {
                            state: {
                              jobId: job.jobId,
                              companyName: job.companyName,
                              position: job.position,
                            },
                          })
                        }
                      >
                        Apply Now
                      </Button>
                    </Grid>
                    <Grid item xs={1} />
                  </>
                )
            )}
            ;
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Employer;
