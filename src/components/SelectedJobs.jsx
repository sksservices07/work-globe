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
import { Button, Modal } from "@mui/material";
import RateMeModal from "../components/RateMeModal";

const SelectedJobs = () => {
  const { address } = useAccount();
  const location = useLocation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
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
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Experience</TableCell>
            <TableCell align="right">Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map(
            (job) =>
              job.status === "closed" &&
              job.employee == address && (
                <TableRow
                  key={job.companyName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {job.companyName}
                  </TableCell>
                  <TableCell align="right">{job.location}</TableCell>
                  <TableCell align="right">{job.salary}</TableCell>
                  <TableCell align="right">{job.experience}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      sx={{ width: "40%", p: 2 }}
                      onClick={handleModalOpen}
                    >
                      Give Feedback
                    </Button>
                  </TableCell>
                  <Modal
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
                  </Modal>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SelectedJobs;
