/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";
import NavBar from "../components/NavBar";
import { shadows } from '@mui/system';
import { spacing } from "@mui/system";

import * as React from "react";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
  },
});

const breakpoints = [576, 768, 992, 1200];
// const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
const mq = breakpoints.map(
  (bp) => `@media only screen and (max-width: ${bp}px)`
);

const backgroundStyles = css`
  background-color: #f5f5f5;
  background-image: url(${require("../img/macbook-pro.jpg")});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 0 300px;
  justify-content: flex-start;
  ${mq[0]} {
    padding: 0 !important;
  }
  ${mq[1]} {
    padding: 0 !important;
  }
  ${mq[2]} {
    padding: 0 200px;
  }
`;

const textStylesH1 = css`
  color: white;
  font-size: 3rem;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  text-shadow: 1px 1px black;
  width: 350px;
  ${mq[1]} {
    font-size: 2rem;
    width: 100%;
  }
  ${mq[2]} {
    font-size: 2.5rem;
    width: 100%;
  }
`;

const textStylesP = css`
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 25px;
  text-shadow: 1px 1px black;
  ${mq[1]} {
    font-size: 20px;
  }
`;

const buttonStyles = css`
  margin-top: 2rem;
  margin-right: 2rem;
  justify-content: center;
  border-radius: 25px;
  width: 200px;
  height: 50px;
  background-color: white;
  color: black;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
    background-color: aliceblue;
  }
  ${mq[1]} {
  }
`;

const buttonContainerStyles = css`
  margin-left: 2rem;
  display: block;
  margin-bottom: 100px;
`;

function Landing() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    checkRegistration();
  }, [chain, address]);

  const checkRegistration = async () => {
    await window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getConfigByChain(chain?.id)[0].contractProxyAddress,
      Job.abi,
      signer
    );
    const tx = await contract.checkRegistration();
    setIsRegistered(tx);
  };
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div css={backgroundStyles}>
        <div css={buttonContainerStyles}>
          <h1 css={textStylesH1}>ONE BILLION PEOPLE USE ONLINE JOB PORTALS</h1>
          <p css={textStylesP}>
            Stay protected by the power of smart contract embeddedin the realm
            of Blockchain
          </p>
          {isRegistered ? (
            <>
              <Link to="/employer" style={{ textDecoration: 'none' }} >
                <Button sx={{borderRadius:5}} color="success" 
                  disabled={false}
                  size="large"
                  variant="outlined">
                  I AM A FREELANCER
                </Button>
              </Link>
              <Link to="/freelancer" style={{ textDecoration: 'none' }}>
                <Button sx={{borderRadius:5,marginLeft:2}} color="secondary" 
                  disabled={false}
                  size="large"
                  variant="outlined">
                  HIRE A FREELANCER
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button sx={{borderRadius:5,marginLeft:2}} color="success" 
                  disabled={false}
                  size="large"
                  variant="outlined">
                Register Yourself
              </Button>
            </Link>
          )}
        </div>
      </div>
      
    </ThemeProvider>
  );
}

export default Landing;
