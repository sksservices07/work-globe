import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Feedback from "../artifacts/contracts/FeedbackContract.sol/FeedbackContract.json";
import { useNavigate } from "react-router-dom";
import { useNetwork } from "wagmi";
import { Rating } from "@mui/material";

const MyRating = ({ userAddress }) => {
  const { chain } = useNetwork();
  const navigate = useNavigate();
  const [myRating, setMyRating] = useState([]);

  useEffect(() => {
    console.log(userAddress);
    getMyRating();
  }, []);

  const getMyRating = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].feedbackAddress,
      Feedback.abi,
      signer
    );
    const tx = await contract.getUserFeedbacks(userAddress);
    // console.log("feedbacks", tx);
    let myRate = 0;
    let myrateLength = 0;
    tx.map((rate) => {
      if (rate.reviewed === userAddress) {
        let rateBG = rate.rating;
        myRate += rateBG.toNumber();
        myrateLength += 1;
      }
    });
    setMyRating(myRate / myrateLength);
  };

  return <Rating name="Rating" defaultValue={0} value={myRating} readOnly />;
};

export default MyRating;
