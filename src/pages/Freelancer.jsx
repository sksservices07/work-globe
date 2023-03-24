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
import { IconButton } from "@mui/material";
import NavBar from "../components/NavBar";
import { css } from "@emotion/react";
import BigNumber from "bignumber.js";
import { Button } from "@mui/material";

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
  const [openJobs, setOpenJobs] = React.useState([]);
  const [closedJobs, setClosedJobs] = React.useState([]);
  const [input, setInput] = React.useState({
    company: "Generic",
    role: "",
    experience: "",
    logo: "generic.png",
  });
  const onRoleChange = (e) => setInput({ ...input, role: e.target.value });
  const onExperienceChange = (e) =>
    setInput({ ...input, experience: e.target.value });
  const onSubmit = () => setOpenJobs([...openJobs, input]);

  const buttonContainerStyles = css`
  margin-left: 2rem;
  display: block;
  margin-bottom: 100px;
`;


  function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function formatBigNumber(bn) {
    const divideBy = new BigNumber("10").pow(new BigNumber(18));
    const converted = new BigNumber(bn.toString());
    const divided = converted.div(divideBy);
    return divided.toFixed(0, BigNumber.ROUND_DOWN);
  }

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
    const allJobs = await contract.getMyPostedJobs();
    const opens = allJobs.filter((job) => {
      return job.status === "open";
    })
    setOpenJobs(opens);
    const closes = allJobs.filter((job) => {
      return job.status === "closed";
    });
    setClosedJobs(closes);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor:"#e8faf8",pb:5
      }}
    >
      <NavBar />
      <FreelanceNavBar
        modalOpen={modalOpen}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
      />
      <div className="tab">
        <Button sx={{ borderRadius: 5 ,mt:5 }} color="success"
          disabled={false}
          size="large"
          variant="outlined"
          className="tablinks"
          onClick={(event) => openTab(event, "Open")}
        >
          Open Jobs
        </Button>
        <Button
          sx={{ borderRadius: 5 ,ml:2,mt:5}} color="error"
          disabled={false}
          size="large"
          variant="outlined"
          className="tablinks"
          onClick={(event) => openTab(event, "Close")}
        >
          Closed Jobs
        </Button>
      </div>
      <div id="Open" className="tabcontent">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            flexDirection: "column",
            gap: 1.2,
            m: 2,
            borderRadius:8,
            width:{
              xs:"100%",
              sm:'100%'
            }
          }}
        >
          {openJobs.map(
            (job) =>
              job.companyName != "" && (
                <ButtonBase
                  onClick={() =>
                    navigate("/jobpost", {
                      state: {
                        jobId: job.jobId * 1,
                        jobIdRaw: job.jobId,
                        companyName: job.companyName,
                        position: job.position,
                        description: job.description,
                        experience: job.experience,
                        location: job.location,
                        salary: job.salary,
                        employer: job.employer,
                        status: job.status,
                        employee: job.employee,
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
                      borderRadius:8,
                      color:"transparent", backgroundColor: 'transparent', ":hover": {
                        boxShadow: 15
                      }, width:{
                        xs:"60vw",
                        sm:'30vw'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "left",
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
                        sx={{ textAlign: "left", ml: 1, color: "grey" }}
                      >
                        Experience: {job.experience} years
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="p"
                        sx={{ textAlign: "left", ml: 1, color: "grey" }}
                      >
                        City: {job.location}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="p"
                        sx={{ textAlign: "left", ml: 1, color: "grey" }}
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
      </div>
      <div id="Close" className="tabcontent">
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
          {closedJobs.map(
            (job) =>
              job.companyName != "" && (
                <ButtonBase
                  onClick={() =>
                    navigate("/jobpost", {
                      state: {
                        jobId: job.jobId * 1,
                        jobIdRaw: job.jobId,
                        companyName: job.companyName,
                        position: job.position,
                        description: job.description,
                        experience: job.experience,
                        location: job.location,
                        salary: job.salary,
                        employer: job.employer,
                        status: job.status,
                        employee: job.employee,
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
      </div>
    </Box>
  );
};

export default Freelancer;
