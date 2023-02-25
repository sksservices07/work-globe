import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Table from "@mui/material/Table";
import Feedback from "../artifacts/contracts/FeedbackContract.sol/FeedbackContract.json";
import { useNetwork } from "wagmi";
import { useLocation } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NavBar from "../components/NavBar";
import FeedbackNavBar from "../components/FeedbackNavBar";
import MyProfile from "../components/MyProfile";

function Feedbacks() {
  // let { userAddress } = useParams();
  const { chain } = useNetwork();
  const location = useLocation();

  const [myRating, setMyRating] = useState([]);

  useEffect(() => {
    console.log("USERADDRESS", location.state.user);
    getMyFeedback();
  }, []);

  const getMyFeedback = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].feedbackAddress,
      Feedback.abi,
      signer
    );
    const tx = await contract.getUserFeedbacks(location.state.user);
    console.log("feedbacks all together", tx);
    setMyRating(tx);
  };

  return (
    <>
      <NavBar />
      <FeedbackNavBar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myRating.map(
              (myRate) =>
                myRate.reviewed === location.state.user && (
                  <TableRow
                    key={myRate.reviewed}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <MyProfile reviewerAddress={myRate.reviewer} />
                    </TableCell>
                    <TableCell align="right">
                      {myRate.rating.toNumber()}
                    </TableCell>
                    <TableCell align="right">{myRate.comments}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Feedbacks;
