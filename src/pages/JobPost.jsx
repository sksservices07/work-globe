import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Paper, Typography, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "../components/NavBar";
import JobPostNavBar from "../components/JobPostNavBar";
import { color } from "@mui/system";

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

const JobPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const { chain } = useNetwork();
  useEffect(() => {
    getMyCandidates();
  }, []);

  const selectCandidate = async (registrationNo,candidateAddress) => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    console.log("jobid:",location.state.jobId)
    console.log("regNo:", registrationNo);
    console.log("candidateAddress:", candidateAddress);
    const tx = await contract.selectCandidate(
      location.state.jobId,
      candidateAddress
    );
    toast.success("Selection in Progress... Please Wait", { icon: "👏" });
    const receipt = await provider
      .waitForTransaction(tx.hash, 1, 150000)
      .then(() => {
        toast.success("Candidate Selected !!");
      });
  };
  const getMyCandidates = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const tx = await contract.getMyCandidates(location.state.jobId);
    console.log('applicants',tx)
    setApplicants(tx);
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder="false" />
      <NavBar />
      <JobPostNavBar />
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, m: 2 }}>
          <Grid container spacing={2} sx={{}}>
            <Grid item xs={12}>
              <Typography variant="h3" component="p" sx={{ mt: 2 }}>
                Job Title: (#{location.state.jobId})
                <Typography
                  variant="h3"
                  component="span"
                  sx={{ textDecoration: "none" }}
                >
                  {location.state.companyName} for {location.state.position}
                </Typography>
              </Typography>
              <Typography variant="h6" component="p" sx={{ mt: 2 }}>
                Location:
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ textDecoration: "none" }}
                >
                  {location.state.location}
                </Typography>{" "}
                &nbsp;&nbsp; Salary(per annum):
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ textDecoration: "none" }}
                >
                  {location.state.salary} (in USD)
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
              <Typography
                variant="h4"
                component="p"
                sx={{
                  textAlign: "left",
                  mt: 3,
                  textDecoration: "none",
                }}
              >
                Applicants
              </Typography>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={2} />
            {applicants.map((applicant, index) => (
              <>
                <Grid item xs={2} />
                <Grid item xs={5}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      textAlign: "left",
                      boxShadow: 5,
                      borderRadius: 20,
                      opacity: [0.7, 0.7, 0.7],
                    }}
                  >
                    <Typography variant="h6" component="p">
                      {applicant.candidateAddress ===
                        location.state.employee && <h2>Candidate Selected</h2>}
                    </Typography>
                    <Typography>
                      {index + 1}. Name: {applicant.name}
                    </Typography>
                    <Typography variant="h6" component="p">
                      Location: {applicant.location}
                    </Typography>
                    <Typography variant="h6" component="p">
                      <a href={applicant.cv} target="_blank" download>
                        <u>
                          <i>Resume</i>
                        </u>
                      </a>
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  {location.state.status != "closed" && (
                    <>
                      <Button
                        variant="contained"
                        sx={{ width: "80%", p: 2 }}
                        onClick={() =>
                          navigate("/messages", {
                            state: {
                              applicantName: applicant.name,
                              applicantAddress: applicant.candidateAddress,
                            },
                          })
                        }
                      >
                        Chat
                      </Button>
                      <br />
                      <br />
                      <Button
                        variant="contained"
                        sx={{ width: "80%", p: 2 }}
                        onClick={() =>
                          selectCandidate(
                            applicant.registrationID,
                            applicant.candidateAddress
                          )
                        }
                      >
                        Select
                      </Button>
                    </>
                  )}
                </Grid>
                <Grid item xs={2} />
              </>
            ))}
            ;
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default JobPost;
