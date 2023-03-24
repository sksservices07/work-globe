import { useState, useEffect } from "react"

import {
  Container,
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
    Select,
    InputLabel,
    MenuItem,
  Checkbox,
} from "@mui/material";

import { ethers } from "ethers";
import { getConfigByChain } from "../../config";
import { useAccount, useNetwork } from "wagmi";
import Job from "../../artifacts/contracts/JobContract.sol/JobContract.json";


const CreateMilestone = () => {
    const { chain } = useNetwork();
    const [openJobs, setOpenJobs] = useState([]);
    const [closedJobs, setClosedJobs] = useState([]);
    const [values, setValues] = useState({
        name: '',
        description: '',
        project_id: '',
        amount: 0,
        loading: false,
        error: false,

    })
    const { project_id, amount, name, description, loading } = values;

  const onSubmit = () => {
      console.log(values)
  };

 const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  useEffect(() => {
      getPostedJobs();
  }, [])

  const getPostedJobs = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const allJobs = await contract.getMyPostedJobs();
    const opens = allJobs.filter((job) => {
      return job.status === "open";
    }).map((job) => {
        return {
            ...job,
            jobId: ethers.utils.formatEther(job.jobId),
        }
    })
    setOpenJobs(opens);
    const closes = allJobs.filter((job) => {
      return job.status === "closed";
    });
    setClosedJobs(closes);
  };


  return (
    <Container maxWidth={false} sx={{ height: "100vh" }}>
      {console.log({openJobs})}
      <Grid
        item
        sx={{ maxWidth: "70rem", width: "100%", backgroundColor: "#fff" }}
      >
        <Grid
          container
          sx={{
            boxShadow: { sm: "0 0 5px #ddd" },
            py: "6rem",
            px: "1rem",
          }}
        >
          <Grid
            item
            container
            justifyContent="center"
            rowSpacing={5}
            sx={{
              maxWidth: { sm: "45rem" },
              marginInline: "auto",
            }}
          >
            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                flexDirection="column"
                component="form"
                noValidate
                autoComplete="off"
                sx={{ paddingRight: { sm: "3rem" } }}
              >
                <Typography
                  variant="h6"
                  component="h1"
                  sx={{ textAlign: "center", mb: "1.5rem" }}
                >
                  Add milestone
                </Typography>

              <FormControl fullWidth 
                  sx={{ mb: "10px" }}
      >
                  <InputLabel id="demo-simple-select-label">Project Id</InputLabel>
                  <Select
                  labelId="milestone-project-id"
                  id="milestone-project-id"
                  label="Project Id"
                  onChange={handleChange("project_id")}
                  value={project_id}
                  >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
              </FormControl>


                <TextField
                  label="Name"
                  type="text"
                  name="milestone-name"
                  sx={{ mb: "10px" }}
                  onChange={handleChange("name")}
                  value={name}
                  required
                />

                <TextField
                  label="Description"
                  type="text"
                  name="milestone-description"
                  sx={{ mb: "10px" }}
                  onChange={handleChange("description")}
                  value={description}
                  required
                />

                <TextField
                  label="Amount"
                  type="number"
                  name="milestone-amount"
                  sx={{ mb: "10px" }}
                  onChange={handleChange("amount")}
                  value={amount}
                  required
                />

                <Button
                  variant="contained"
                  sx={{
                    py: "0.8rem",
                    mt: 2,
                    width: "80%",
                    marginInline: "auto",
                  }}
                 onClick={onSubmit}
                >
                  Add Milestone
                </Button>

              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateMilestone;
