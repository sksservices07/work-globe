import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useNetwork } from "wagmi";

const MyProfile = ({ reviewerAddress }) => {
  const { chain } = useNetwork();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    console.log(reviewerAddress);
    getProfile();
  }, []);

  const getProfile = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const tx = await contract.getProfile(reviewerAddress);
    // console.log("tx", tx);
    // debugger
    setProfile(tx);
  };

  return <>{profile.name}</>;
};

export default MyProfile;
