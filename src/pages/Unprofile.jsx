import * as React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button, TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import NavBar from "../components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import Image from '../img/profile.png'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFA920",
          borderRadius:18,
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "#FFA920",

          },
        },
      },
    },
  },
});

const style = theme => ({
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'green !important'
  },
  cssLabel: {
    color: 'green'
  },
})

function Applicant() {
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState([]);
  const { chain } = useNetwork();
  const [typeOfAccount, setTypeOfAccount] = React.useState('');

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
  const [numbers, setNumbers] = useState(0);

  useEffect(() => {
    let num = (window.innerHeight - 70) / 50;
    setNumbers(parseInt(num));
  }, [])

  const [value, setValue] = React.useState();
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

  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <NavBar />
      {/* <AnchorComponent number={numbers} /> */}
      {/* <RegisterNavbar /> */}
      <Toaster position="top-center" reverseOrder="false" />
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${Image})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#252525',
              backgroundSize: '80%  80%',
              backgroundPosition: 'left',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square sx={{ backgroundColor: '#252525'}}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                
              }}
            >
              <Box component="form" noValidate sx={{ mt: 0.5, backgroundColor: 'black', pl: 6, pr: 6, pb: 6,borderRadius:8 }}>
                {/* <IconButton onClick={() => navigate(-1<ToggleButtonGroup value={alignment}  sx={{mb:5}} exclusive onChange={handleAlignment}>
                <ToggleButton value="Me">Hire Me</ToggleButton>
                <ToggleButton value="SomeOne">Hire SomeOne</ToggleButton>
                </ToggleButtonGroup>)}>
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton> */}
                <Typography sx=
                  {
                    {
                      fontSize: 28,
                      fontWeight: 700,
                      color: 'white',
                    }
                  }
                >
                  <h1>
                    My Profile
                  </h1>
                </ Typography>
                {/*  */}
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} md={4}>
                    <img src={Image} alt="Image" style={{ maxWidth: '100%' }} />
                  </Grid> */}
                  <Grid item xs={12} md={16} >

                    <Box border={1}  p={2}  sx={{ backgroundColor: '#252525',borderRadius:6 }}> 
                      <Typography
                        margin="normal"
                        required
                        fullWidth
                        name="Name"
                        fontSize="28"
                        fontWeight='700'
                        color='grey'
                        variant="h6"
                        nowrap={false}

                      >
                        Name: Harsh
                      </ Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={16}>

                    <Box border={1}  p={2}  sx={{ backgroundColor: '#252525',borderRadius:6 }}>
                      <Typography
                        margin="normal"
                        required
                        fullWidth
                        name="Name"
                        fontSize="28"
                        fontWeight='700'
                        color='grey'
                        variant="h6"
                        nowrap={false}
                      >
                        I am a: sample

                      </ Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={16}>

                    <Box border={1}  p={2}  sx={{ backgroundColor: '#252525',borderRadius:6 }}>
                      <Typography
                        margin="normal"
                        required
                        fullWidth
                        name="Name"
                        fontSize="28"
                        fontWeight='700'
                        color='grey'
                        variant="h6"
                        nowrap={false}
                      >
                        City: sample
                      </ Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={16}>

                    <Box border={1}  p={2}  sx={{ backgroundColor: '#252525',borderRadius:6 }}>
                      <Typography
                        margin="normal"
                        required
                        fullWidth
                        name="Name"
                        fontSize="28"
                        fontWeight='700'
                        color='grey'
                        variant="h6"
                        nowrap={false}
                      >
                        Ratings:
                      </ Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Button
                  // type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                 
                >
                  Jobs Applied
                </Button>
                {/* <Button
                  // type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 0.5 }}
                  onClick={() => {
                    registerProfile();
                  }}
                >
                  Posted Jobs
                </Button> */}

              </Box>
            </Box>
          </Grid>
        </Grid>

      </ThemeProvider>
    </>
  );
}

export default Applicant;

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Avatar, Typography, Grid } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: theme.spacing(2),
//   },
//   avatar: {
//     width: theme.spacing(20),
//     height: theme.spacing(20),
//     marginRight: theme.spacing(2),
//   },
// }));

// function Unprofile() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={2}>
//         <Grid item>
//           <Avatar
//             className={classes.avatar}
//             alt="John Doe"
//             src="https://picsum.photos/id/237/200/200"
//           />
//         </Grid>
//         <Grid item xs={12} sm container>
//           <Grid item xs container direction="column" spacing={2}>
//             <Grid item xs>
//               <Typography variant="h4">John Doe</Typography>
//               <Typography variant="subtitle1">
//                 Web Developer at XYZ Company
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Typography variant="body1">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//                 tempor incididunt ut labore et dolore magna aliqua.
//               </Typography>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default Unprofile;
