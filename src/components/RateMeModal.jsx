import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Feedback from "../artifacts/contracts/FeedbackContract.sol/FeedbackContract.json";
import { useAccount, useNetwork } from "wagmi";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Rating,
} from "@mui/material";
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

const RateMeModal = (props) => {
  const { chain } = useNetwork();
  const { input, onRoleChange, onExperienceChange, name,address, handleModalClose } =
    props;

  const [formInput, updateFormInput] = useState({
    comments: "",
  });
  const [value, setValue] = useState(0);

  const validate = (data) => {
    if (
      data?.comments &&
      value !=0
    ) {
      return true;
    } else {
      toast.error("There are some incomplete fields in your submission!", {
        icon: "ℹ️",
      });
      return false;
    }
  };

  

  const saveFeedback = async () => {
    // validate
    if (!validate(formInput)) return;

    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].feedbackAddress,
      Feedback.abi,
      signer
    );

    const tx = await contract.addFeedback(address,value,formInput.comments);
    toast.success("Saving... Please Wait", { icon: "👏" });
    const receipt = await provider
      .waitForTransaction(tx.hash, 1, 150000)
      .then(() => {
        toast.success("Thanks for your valuable feedback !!");
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
              Tell Us About Your Experience
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Rating For"
              variant="outlined"
              value={name}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h6">
              Rating:
            </Typography>
            <Rating
              name="Rating"
              precision={0.5}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="My Comments"
              variant="outlined"
              multiline
              maxRows={Infinity}
              fullWidth
              onChange={(e) =>
                updateFormInput((formInput) => ({
                  ...formInput,
                  comments: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={4} />
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                saveFeedback();
              }}
            >
              Submit Feedback
            </Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default RateMeModal;
