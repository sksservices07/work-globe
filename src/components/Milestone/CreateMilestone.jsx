import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";

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
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

import { getConfigByChain } from "../../config";
import Job from "../../artifacts/contracts/JobContract.sol/JobContract.json";
import MilestoneContract from "../../artifacts/contracts/MilestoneContract.sol/MilestoneContract.json";

const CreateMilestone = () => {
  const { chain } = useNetwork();
  const [openJobs, setOpenJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    project_id: "",
    amount: 0,
    error: false,
  });
  const { project_id, amount, name, description } = values;

  // TODO: this functions has bug
  const onSubmit = async () => {
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      MilestoneContract.abi,
      signer
    );

    const tx = await contract.addMilestone(
      project_id,
      name,
      description,
      amount
    );
    toast.success("Creating milestone... Please Wait", { icon: "👏" });
    await provider.waitForTransaction(tx.hash, 1, 150000).then(() => {
      toast.success("Milestone created !!");
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  useEffect(() => {
    getPostedJobs();
  }, []);

  const getPostedJobs = async () => {
    setLoading(true);
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
    const opens = allJobs
      .filter((job) => {
        return job.status === "open";
      })
      .map((job) => {
        return {
          ...job,
          jobId: job.jobId.toString(),
        };
      });
    setLoading(false);
    setOpenJobs(opens);
  };

  return (
    <Container maxWidth={false} sx={{ height: "100vh" }}>
      {console.log({ openJobs })}
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

                <FormControl fullWidth sx={{ mb: "10px" }} disabled={loading}>
                  <InputLabel id="demo-simple-select-label">
                    Project Id
                  </InputLabel>
                  <Select
                    labelId="milestone-project-id"
                    id="milestone-project-id"
                    label="Project Id"
                    onChange={handleChange("project_id")}
                    value={project_id}
                  >
                    {openJobs.map((job, idx) => (
                      <MenuItem
                        value={job.jobId}
                        key={idx + "-project-id"}
                      >{`${job.jobId} - ${job.companyName} - ${job.position}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Name"
                  type="text"
                  name="milestone-name"
                  sx={{ mb: "10px" }}
                  onChange={handleChange("name")}
                  value={name}
                  disabled={loading}
                  required
                />

                <TextField
                  label="Description"
                  type="text"
                  name="milestone-description"
                  sx={{ mb: "10px" }}
                  disabled={loading}
                  onChange={handleChange("description")}
                  value={description}
                  required
                />

                <TextField
                  label="Amount"
                  type="number"
                  name="milestone-amount"
                  disabled={loading}
                  sx={{ mb: "10px" }}
                  onChange={handleChange("amount")}
                  value={amount}
                  required
                />

                <Button
                  variant="contained"
                  disabled={loading}
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
