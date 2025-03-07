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
import MyRating from "../components/MyRating";
import Modal from "../components/Modal/Modal";

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

function Lancers() {
  const [profiles, setProfile] = React.useState([]);
  const { chain } = useNetwork();
  const { address } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    getAllProfiles();
  }, []);

  const getAllProfiles = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const tx = await contract.getAllProfile();
    const opens = tx.filter((job) => {
      const type = job.typeOfAccount;
      return type.toLowerCase() === "Freelancer".toLowerCase();
    });
    console.log(opens)
    setProfile(opens);
  };

  return (
    <>
      <NavBar />
      <EmployerNavBar />
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{backgroundColor:"#e8faf8"}}>
            {profiles.map(
              (profile) =>
                profile.myAddress !== "" && (
                  <>
                    <Grid item xs={1} />
                    <Grid item xs={7}>
                      <ButtonBase onClick={() =>
                        navigate("/feedbacks", {
                          state: {
                            user: profile.user
                          },
                        })
                      }>
                        <Paper
                          elevation={3}
                          sx={{
                            p: 2,
                            width: "40vw",
                            display: "flex",
                            alignItems: "left",
                            borderRadius: 8,
                            color:"transparent", backgroundColor: 'transparent', ":hover": {
                              boxShadow: 15
                            }
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
                              alignItems: "left",
                              justifyContent: "center",
                              m: 2, backgroundColor: 'transparent'
                            }}
                          >
                            <Typography
                              variant="h6"
                              component="p"
                              sx={{ color: "black" }}
                            >
                              Name: {profile.name}
                              {' '}
                              <MyRating userAddress={profile.user.toString()} />
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              component="p"
                              align="left"
                              sx={{ color: "grey" }}
                            >
                              Type: {profile.typeOfAccount}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              component="p"
                              sx={{ textAlign: "left",  color: "grey" }}
                            >
                              City: {profile.myAddress}
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
                      
                      <Modal user={profile.user} name={profile.name} />
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

export default Lancers;
