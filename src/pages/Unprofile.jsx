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
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import RegisterNavbar from "../components/RegisterNavbar";
import AnchorComponent from '../subComponents/Anchor'
import { motion } from 'framer-motion'
import Image from '../img/profile_page.png'

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

  return (
    <>
      <NavBar />
      {/* <AnchorComponent number={numbers} /> */}
      {/* <RegisterNavbar /> */}
      <Toaster position="top-center" reverseOrder="false" />
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          
        </Grid>

      </ThemeProvider>
    </>
  );
}

export default Applicant;
