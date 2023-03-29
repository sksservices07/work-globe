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
// import { Button, ButtonBase } from "@mui/material";

const SelectedJobs = () => {
  const { address } = useAccount();
  const location = useLocation();
  const navigate = useNavigate();
  // const [jobs, setJobs] = useState([]);
  // const [currentJobs, setCurrentJobs] = useState(false);
  const { chain } = useNetwork();

  // const [modalOpen, setModalOpen] = React.useState(false);
  // const handleModalOpen = () => setModalOpen(true);
  // const handleModalClose = () => setModalOpen(false);
  const [openJobs, setOpenJobs] = useState([]);
  const [closedJobs, setClosedJobs] = useState([]);
  // const [input, setInput] = React.useState({
  //   company: "Generic",
  //   role: "",
  //   experience: "",
  //   logo: "generic.png",
  // });
  // const onRoleChange = (e) => setInput({ ...input, role: e.target.value });
  // const onExperienceChange = (e) =>
  //   setInput({ ...input, experience: e.target.value });
  // const onSubmit = (e) => setInput({ ...input, experience: e.target.value });

  useEffect(() => {
    getMyJobPostings();
  }, []);

  const getMyJobPostings = async () => {
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
    // console.log("jobs", tx);

    // setJobs(tx);

    const opens = allJobs.filter((job) => {
      return job.status === "open";
    })
    setOpenJobs(opens);
    const closes = allJobs.filter((job) => {
      return job.status === "closed";
    });
    setClosedJobs(closes);

    // for (let index = 0; index < tx.length; index++) {
    //   if(tx[index].status === "closed" ||
    //     tx[index].status === "open") {
    //       setCurrentJobs(true)
    //       break;
    //   } else {
    //       setCurrentJobs(false)
    //   } 
    // }
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
          </TableRow>
        </TableHead>
        <TableBody>
        {/* currentJobs && */}
          {openJobs.map(
            (job) =>
              job.companyName != "" && (
                <TableRow
                  key={job.companyName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                  <TableCell component="th" scope="row">
                    {job.companyName}
                  </TableCell>
                  <TableCell align="center">{job.location}</TableCell>
                  <TableCell align="center">{job.salary}</TableCell>
                  <TableCell align="center">{job.position}</TableCell>
                  <TableCell align="center"> Open </TableCell>
                </TableRow>
              ))}
          {closedJobs.map(
            (job) =>
              job.companyName != "" && (
                <TableRow
                  key={job.companyName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                  <TableCell component="th" scope="row">
                    {job.companyName}
                  </TableCell>
                  <TableCell align="center">{job.location}</TableCell>
                  <TableCell align="center">{job.salary}</TableCell>
                  <TableCell align="center">{job.position}</TableCell>
                  <TableCell align="center"> Closed </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      {openJobs.length === 0 && closedJobs.length === 0 && (
        <h2> Start posting jobs!! </h2> // need to check if employer(his job listings) or freelancer
      )}
    </TableContainer>
  );
};

export default SelectedJobs;
