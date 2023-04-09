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
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import RegisterNavbar from "../components/RegisterNavbar";
import Image from '../img/profile_page.png'
import { alpha } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFA920",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "#1fe47a",

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
    color : 'green'
  },
})

function Unregister() {
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
      <NavBar />
      {/* <RegisterNavbar /> */}
      <Toaster position="top-center" reverseOrder="false" />
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor:'#252525',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square sx={{
              backgroundColor: '#252525'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate  sx={{ mt:0.5,bgcolor: alpha("#000000", 0.4),p:6,borderRadius:18}}>
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
                  Register Yourself
                </h1>
              </ Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="Name"
                autoComplete="Name"
                autoFocus
                id="outlined-basic"
                InputProps={{
                  style: { color: "grey" },
                }}
                sx={{ backgroundColor: '#252525',borderRadius:4}}
                label="Name"
                variant="outlined"
                onChange={(e) =>
                  updateFormInput((formInput) => ({
                    ...formInput,
                    name: e.target.value,
                  }))
                }
              />
               <FormControl required fullWidth margin="normal">
              <InputLabel id="select-required-label"> Freelancer / Employer </InputLabel>
              <Select
                labelId="select-required-label"
                id="outlined-basic"
                value={formInput.typeOfRegistration}
                label="Freelancer / Employer"
                InputProps={{
                  style: { color: "grey" },
                }}
                sx={{ backgroundColor: '#252525',borderRadius:4}}
                onChange={(e) =>
                  updateFormInput((formInput) => ({
                    ...formInput,
                    typeOfRegistration: e.target.value,
                  }))
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'Freelancer'}>Freelancer</MenuItem>
                <MenuItem value={'Employer'}>Employer</MenuItem>
              </Select>
            </FormControl>
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="FreeLancer"
                type="FreeLancer"
                id="FreeLancer"
                autoComplete=""
                value={formInput.typeOfRegistration}
                label="Freelancer / Employer"
                onChange={(e) =>
                  updateFormInput((formInput) => ({
                    ...formInput,
                    typeOfRegistration: e.target.value,
                  }))
                }
              /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="City"
                autoComplete="City"
                autoFocus
                id="outlined-basic"
                label="City"
                variant="outlined"
                InputProps={{
                  style: { color: "grey" },
                }}
                sx={{ backgroundColor: '#252525',borderRadius:4}}
                onChange={(e) =>
                  updateFormInput((formInput) => ({
                    ...formInput,
                    City: e.target.value,
                  }))
                }
              />
           
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                    registerProfile();
                  }}
              >
                Register Me
              </Button>
              
            </Box>
          </Box>
        </Grid>
        </Grid>
      
        </ThemeProvider>
    </>
  );
}

export default Unregister;
