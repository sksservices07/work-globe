import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Table from "@mui/material/Table";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";
import { useNavigate, useLocation } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Modal as ModalMUI } from "@mui/material";
import RateMeModal from "../components/RateMeModal";
import Modal from "../components/Modal/Modal";

const SelectedJobs = () => {
  const { address } = useAccount();
  const location = useLocation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState(false);
  const { chain } = useNetwork();

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [input, setInput] = React.useState({
    company: "Generic",
    role: "",
    experience: "",
    logo: "generic.png",
  });
  const onRoleChange = (e) => setInput({ ...input, role: e.target.value });
  const onExperienceChange = (e) =>
    setInput({ ...input, experience: e.target.value });
  const onSubmit = (e) => setInput({ ...input, experience: e.target.value });

  useEffect(() => {
    getMyAppliedJobs();
  }, []);

  const getMyAppliedJobs = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const tx = await contract.myAppliedJobs();
    console.log("jobs", tx);

    setJobs(tx);

    for (let index = 0; index < tx.length; index++) {
      if(tx[index].status === "closed" ||
        tx[index].status === "open") {
          setCurrentJobs(true)
          break;
      } else {
          setCurrentJobs(false)
      } 
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Salary</TableCell>
            <TableCell align="center">Position</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Chat</TableCell>
            <TableCell align="center">Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentJobs && jobs.map(
            (job) =>
              (job.status === "closed" ||
              job.status === "open") && (
                <TableRow
                  key={job.companyName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {job.companyName}
                  </TableCell>
                  <TableCell align="center">{job.location}</TableCell>
                  <TableCell align="center">{job.salary}</TableCell>
                  <TableCell align="center">{job.position}</TableCell>
                  {job.status === "closed" ?
                  <TableCell align="center">{job.employee == address ? 'Selected' : 'Not Selected'}</TableCell>
                  : <TableCell align="center"> Applied </TableCell>
                  }
                  <TableCell align="center">
                  <Modal user={job.employer} name={job.companyName} />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{ width: "70%", p: 2 }}
                      onClick={handleModalOpen}
                    >
                      Give Feedback
                    </Button>
                  </TableCell>
                  
                  <ModalMUI
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <RateMeModal
                      input={input}
                      // company or employer????
                      name={job.companyName}
                      address={job.employer}
                      onRoleChange={onRoleChange}
                      onExperienceChange={onExperienceChange}
                      onSubmit={onSubmit}
                      handleModalClose={handleModalClose}
                    />
                  </ModalMUI>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
      {!currentJobs && (
        <h2> Start Applying for jobs!! </h2> 
      )}
    </TableContainer>
  );
};

export default SelectedJobs;
