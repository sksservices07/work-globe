import * as React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { css } from "@emotion/react";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import NavBar from "../components/NavBar";
import { ButtonBase, Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import { spacing } from "@mui/system";
import { makeStyles } from "@mui/styles";
import MyRating from "../components/MyRating";
import GradeIcon from '@mui/icons-material/Grade';
import MyProfileNavbar from "../components/MyProfileNavabar";
import SelectedJobs from "../components/SelectedJobs";

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

const backgroundStyles = css`
background-color:#7FB4AD;
`;

// const boxStyle = css`
//   margin-top: 2rem;
//   margin-right: 2rem;
//   justify-content: center;
//   border-radius: 25px;
//   width: 200px;
//   height: 50px;
//   background-color: white;
//   color: black;
//   transition: transform 0.2s ease-in-out;
//   &:hover {
//     transform: scale(1.05);
//     background-color: aliceblue;
//   }
// `;

function Profile() {
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState([]);
  const { chain } = useNetwork();
  const [myProfile, setMyProfile] = useState([]);
  const { address } = useAccount();

  useEffect(() => {
    getMyProfile();
  }, [address, chain]);

  const useStyles = makeStyles((theme) => ({
    gridClassName: {
      boxShadow: "5px 10px red",
    },
    // other classes here
  }));

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
    console.log("tx", tx);
    debugger
    setMyProfile(tx);
  };

  return (
    <>
      <NavBar />
      <MyProfileNavbar />
      <Toaster position="top-center" reverseOrder="false" />
      <ThemeProvider theme={theme} >
        <Grid container spacing={3} justify="center" sx={{backgroundColor:"#e8faf8"}}>
          <Grid item xs={12}>
            {/* <Typography variant="h6" component="h2">
              My Profile
            </Typography> */}
          </Grid>
          {/* For the image addition */}
          {/* <Grid xs={4}>
            <img src="" alt="" />
          </Grid> */}
          <Grid item xs={12}>
            {/* for image */}
            <Grid xs={4} sx={{ mr: 10 }}>
              {/* <img 
                width={800}
                height={800}
                src={require("../img/profile_page.png")} 
                alt="" /> */}
            </Grid>
            <Box
              component=""
              sx={{
                p: 1,
                border: "1px  solid grey",
                width: 500,
                height: 60,
                ml: 50,
                borderRadius: 20,
                opacity: [0.7, 0.7, 0.7],
                boxShadow: 5,
              }}
            >

              <Grid sx={{ mr: 20 }}>
                <h2>
                  {" "}
                  <IconButton>
                    <AccountCircleIcon sx={{ color: "black" }} />
                  </IconButton>{" "}
                  Name: {myProfile.name}
                </h2>
              </Grid>
            </Box>
          </Grid>
          <Box width="30%" />
          <Grid item xs={12}>
            <Box
              component=""
              sx={{
                p: 1,
                border: "1px  solid grey",
                width: 500,
                height: 60,
                ml: 50,
                borderRadius: 20,
                opacity: [0.7, 0.7, 0.7],
                boxShadow: 5,
              }}
            >
              <Grid sx={{ mr: 20 }}>
                <h2>
                  <IconButton>
                    <EngineeringIcon sx={{ color: "black" }} />
                  </IconButton>
                  I am a: {myProfile.typeOfAccount}
                </h2>
              </Grid>
            </Box>
          </Grid>
          <Box width="30%" />
          <Grid item xs={12}>
            <Box
              component=""
              sx={{
                p: 1,
                border: "1px  solid grey",
                width: 500,
                height: 60,
                ml: 50,
                borderRadius: 20,
                opacity: [0.7, 0.7, 0.7],
                boxShadow: 5,
              }}
            >
              <Grid sx={{ mr: 25 }}>
                <h2>
                  <IconButton>
                    <PersonPinCircleIcon sx={{ color: "black" }} />
                  </IconButton>
                  City: {myProfile.myAddress}
                </h2>
              </Grid>
            </Box>

          </Grid>
          <Box width="30%" />
          <Grid item xs={12}>
            <Box
              component=""
              sx={{
                p: 1,
                border: "1px  solid grey",
                width: 500,
                height: 60,
                ml: 50,
                borderRadius: 20,
                opacity: [0.7, 0.7, 0.7],
                boxShadow: 5,
              }}
            >
              <Grid item sx={{ mr: 18 }}>
                <ButtonBase onClick={() =>
                  navigate("/feedbacks", {
                    state: {
                      user: address
                    },
                  })
                }>
                  <h2>
                    <IconButton>
                      <GradeIcon sx={{ color: "black" }} />
                    </IconButton>
                    Rating:
                    <MyRating userAddress={(address).toString()} />
                  </h2>
                </ButtonBase>
              </Grid>
            </Box>
            {/* <Grid xs={4}>
            <img src="https://img.freepik.com/free-vector/recruit-agent-analyzing-candidates_74855-4565.jpg?t=st=1676035583~exp=1676036183~hmac=7919f760bc6a25ec389a28b4688275d8622f524943830217ebf2c10e9b1aa261" alt="" />
          </Grid> */}
          </Grid>
          <Box width="30%" />
          <Grid item xs={4} />
          <Grid item xs={4}></Grid>
          <Grid item xs={4} />
        </Grid>
      </ThemeProvider>
      <SelectedJobs />
    </>
  );
}

export default Profile;
