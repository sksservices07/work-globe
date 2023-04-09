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
import {  makeStyles } from '@material-ui/core';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { motion } from 'framer-motion'
import Image from '../img/profile_page.png'

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFA920",
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

  const useStyles = makeStyles({
    input: {
      '&$focused': {
        color: 'green',
        borderColor: 'green',
      },
    },
    focused: {},
  });

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

  const classes = useStyles();

  return (
    <>
      <NavBar />
      {/* <AnchorComponent number={numbers} /> */}
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
              backgroundColor: '#252525',
              backgroundSize: '60% 60%',
              backgroundPosition: 'right center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square sx={{backgroundColor:'#252525'}}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component="form" noValidate sx={{ mt: 0.5,
                 backgroundColor: 'black',opacity:'20', borderRadius: '18px',
                  pr:25,pl:2,pb:10,pt:2}}>
                <Typography sx=
                  {
                    {
                      fontSize: 32,
                      fontWeight: 700,
                      color: 'white',
                    }
                  }
                >
                    Apply for Jobs
                </ Typography>
                <motion.div
                  initial={{
                    y: 0,
                    transition: { type: 'spring', duration: 1.5, delay: 1 }
                  }}
                  animate={{
                    y: 20,
                    transition: { type: 'spring', duration: 1.5, delay: 1 }
                  }}>

                  <TextField
                    margin="normal"
                    required
                    focused
                    fullWidth
                    name="Experience"
                    autoComplete="Experience"
                    autoFocus
                    id="outlined-basic"
                    label="Experience"
                    sx={{ backgroundColor: '#252525',color: 'white'  }}
                    variant="outlined"
                    onChange={(e) =>
                      updateFormInput((formInput) => ({
                        ...formInput,
                        name: e.target.value,
                      }))
                    }
                  />
                </motion.div>
                <motion.div
                  initial={{
                    y: 0,
                    transition: { type: 'spring', duration: 1.5, delay: 1 }
                  }}
                  animate={{
                    y: 20,
                    transition: { type: 'spring', duration: 1.5, delay: 1 }
                  }}>

                  <Typography  sx={{ backgroundColor: '#252525',color:'' }}> 
                    <CurrencyTextField
                      fullWidth
                      label="Fees"
                      variant="outlined"
                      value={value}
                      currencySymbol="INR"
                      minimumValue="0"
                      outputFormat="string"
                      decimalCharacter="."
                      digitGroupSeparator=","
                      onChange={(event, value) => setValue(value)}
                    />
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{
                    y: 0,
                    transition: { type: 'spring', duration: 1.5, delay: 1 }
                  }}
                  animate={{
                    y: 20,
                    transition: { type: 'spring', duration: 1.5, delay: 1 }
                  }}>
                  <TextField 
                    margin="normal"
                    required
                    fullWidth
                    name="FreeLancer"
                    type="FreeLancer"
                    id="FreeLancer"
                    autoComplete=""
                    sx={{ backgroundColor: '#252525' }}
                    value={formInput.typeOfRegistration}
                    label="Estimated Completion Time in days"
                    onChange={(e) =>
                      updateFormInput((formInput) => ({
                        ...formInput,
                        typeOfRegistration: e.target.value,
                      }))
                    }
                  />
                </motion.div>
                <motion.div
                  initial={{
                    y: -20,
                    transition: { type: 'spring', duration: 1.5, delay: 1 }
                  }}
                  animate={{
                    y: 20,
                    transition: { type: 'spring', duration: 1.5, delay: 1 }
                  }}>
                  <TextField 
                    margin="City"
                    required
                    fullWidth
                    name="City"
                    autoComplete="City"
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    sx={{ backgroundColor: '#252525' }}
                    onChange={(e) =>
                      updateFormInput((formInput) => ({
                        ...formInput,
                        City: e.target.value,
                      }))
                    }
                    InputProps={{
                      classes: {
                        input: classes.input,
                        focused: classes.focused,
                      },
                    }}
                  />
                </motion.div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, mb: 2 }}
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

export default Applicant;
