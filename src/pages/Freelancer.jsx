import * as React from "react";
import { useEffect, useState } from "react";
import FreelanceNavBar from "../components/FreelanceNavBar";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";
import { Box, Paper, Typography, ButtonBase, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import JobPostModal from "../components/PostJobModal";
import {  IconButton } from "@mui/material";
import NavBar from "../components/NavBar";

const Freelancer = () => {
  const navigate = useNavigate();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  useEffect(() => {
    goGetMyPostedJobs();
  }, [chain, address]);
  const [jobs, setJobs] = React.useState([]);
  const [input, setInput] = React.useState({
    company: "Generic",
    role: "",
    experience: "",
    logo: "generic.png",
  });
  const onRoleChange = (e) => setInput({ ...input, role: e.target.value });
  const onExperienceChange = (e) =>
    setInput({ ...input, experience: e.target.value });
  const onSubmit = () => setJobs([...jobs, input]);

  const goGetMyPostedJobs = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const tx = await contract.getMyPostedJobs();
    console.log("tx", tx);
    setJobs(tx);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      
    <NavBar/>
      <FreelanceNavBar
        modalOpen={modalOpen}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          flexDirection: "column",
          gap: 1.2,
          m: 2,
        }}
      >
        {jobs.map(
          (job) =>
            job.companyName != "" && (
              <ButtonBase
                onClick={() =>
                  navigate("/jobpost", {
                    state: {
                      companyName: job.companyName,
                      position: job.position,
                      description: job.description,
                      experience: job.experience,
                      location: job.location,
                      salary: job.salary,
                      employer: job.employer,
                    },
                  })
                }
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    width: "30vw",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="p"
                      sx={{ textAlign: "left", ml: 1, color: "black" }}
                    >
                      {job.companyName}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{ textAlign: "left", ml: 1, color: "black" }}
                    >
                      {job.position}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{ textAlign: "left", ml: 1, color: "black" }}
                    >
                      Experience: {job.experience} years
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{ textAlign: "left", ml: 1, color: "black" }}
                    >
                      City: {job.location}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{ textAlign: "left", ml: 1, color: "black" }}
                    >
                      Salary (per annum): {job.salary} (in USD)
                    </Typography>
                  </Box>
                </Paper>
              </ButtonBase>
            )
        )}

        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <JobPostModal
            input={input}
            onRoleChange={onRoleChange}
            onExperienceChange={onExperienceChange}
            onSubmit={onSubmit}
            handleModalClose={handleModalClose}
          />
        </Modal>
      </Box>
    </Box>
  );
};

export default Freelancer;
