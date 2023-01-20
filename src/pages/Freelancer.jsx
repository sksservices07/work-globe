import * as React from "react";
import FreelanceNavBar from "../components/FreelanceNavBar";

import { Box, Paper, Typography, ButtonBase, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

import JobPostModal from "../components/PostJobModal";

// "
// text-align: left;
// align-items: flex-start;
// display: flex;
// "

const Freelancer = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  // const [jobposts, setJobposts] = React.useState([{}]);
  const jobs = [
    {
      company: "Netflix",
      role: "Senior Web Developer",
      experience: "3 yrs experience",
      logo: "netflix-512.png",
    },
    {
      company: "Tata",
      role: "Senior Software Engineer",
      experience: "5 yrs experience",
      logo: "tata-logo-blue.png",
    },
    {
      company: "Wipro",
      role: "Senior Software Engineer",
      experience: "2 yrs experience",
      logo: "wipro-logo.png",
    },
  ];
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
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
        {jobs.map((job) => (
          <ButtonBase
            onClick={() =>
              navigate("/jobpost", {
                state: {
                  company: job.company,
                  role: job.role,
                  experience: job.experience,
                  logo: job.logo,
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
              <img
                src={require(`../img/${job.logo}`)}
                alt={job.logo}
                height={100}
                width={100}
              />
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
                  {job.role}
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="p"
                  sx={{ textAlign: "left", ml: 1, color: "black" }}
                >
                  {job.experience}
                </Typography>
              </Box>
            </Paper>
          </ButtonBase>
        ))}

        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <JobPostModal />
        </Modal>
      </Box>
    </Box>
  );
};

export default Freelancer;
