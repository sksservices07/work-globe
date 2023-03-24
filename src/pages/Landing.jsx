/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getConfigByChain } from "../config";
import Job from "../artifacts/contracts/JobContract.sol/JobContract.json";
import { useAccount, useNetwork } from "wagmi";
import NavBar from "../components/NavBar";
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import TextTransition, { presets } from "react-text-transition";


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
  background-color: #e8faf8;
  background-image: url(https://media.giphy.com/media/iIGT8Y1rOYhBpdHh1C/giphy.gif);
  background-repeat: no-repeat;
  background-size: 30vw 60vh;
  background-position: right;
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 0 0px;
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
const backgroundStylesrest = css`
  background-color: #e8faf8;
  
`;


const textStylesH1 = css`
  color: #3b5169 ;
  font-size: 3rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-shadow: 2px 1px black;
  width: 550px;
  ${mq[1]} {
    font-size: 2rem;
    width: 100%;
  }
  ${mq[2]} {
    font-size: 1.8rem;
    width: 70%;
  }
`;

const textStylesP = css`
  color: #6e96c2;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 20px;
  text-shadow: 0.5px 0.4px black;
  width: 550px;
  ${mq[1]} {
    font-size: 18px;
    width:50%;
  }
`;

const buttonStyles = css`
 
  ${mq[1]} {
    font-size: 10px;
    widht:10%;
    
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
      <NavBar position="fixed" />
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
                <Button css={buttonStyles} sx={{ boxShadow: 5, borderRadius: 5, p: 3 }} color="success"
                  disabled={false}
                  size="large"
                  variant="outlined">
                  I AM A FREELANCER
                </Button>
              </Link>
              <Link to="/freelancer" style={{ textDecoration: 'none' }}>
                <Button css={buttonStyles} sx={{ boxShadow: 5, borderRadius: 5, marginLeft: 2, p: 3 }}

                  disabled={false}
                  size="large"
                >
                  HIRE A FREELANCER
                </Button>
              </Link>
            </>
          ) : (
            <Link css={buttonStyles} to="/register" style={{ textDecoration: 'none' }}>
              <Button sx={{ borderRadius: 5, marginLeft: 15, p: 3 }} color="success"
                disabled={false}
                size="large"
                variant="outlined">
                Register Yourself
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div css={backgroundStylesrest}></div>


      {/* different section */}
      <div css={backgroundStylesrest}>
        <Divider variant="middle" flexItem>
          {/* text can be added here  */}
        </Divider>

        {/* <div css={backgroundColor}> */}
        <Typography
          variant="h3"
          component="h1"
          sx={{ textAlign: "left", m: 8, ml: 6, color: "grey" }}

        >Are you hiring?
        </Typography>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap'
        }}>

          <Grid container>
            <Grid item xs={12} sm={4}>
              <Card sx={{
                maxWidth: 345, m: 5, backgroundColor: 'transparent', ":hover": {
                  boxShadow: 15
                }
              }}>
                <CardMedia
                  component="img"
                  alt=""
                  height="190"
                  image="https://img.freepik.com/free-vector/tiny-people-searching-business-opportunities_74855-19928.jpg?w=1060&t=st=1677782603~exp=1677783203~hmac=bc50bf378cab5531b337cae9d82ae75062d3fcf428d29bb441df7f26a24b61bb"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Post a job
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.
                  </Typography>
                </CardContent>

              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{
                maxWidth: 345, m: 5, backgroundColor: 'transparent', ":hover": {
                  boxShadow: 15
                }
              }}>
                <CardMedia
                  component="img"
                  alt=""
                  height="190"
                  image="https://img.freepik.com/free-vector/freelancer-flexible-remote-work-locations-isometric-flowchart-with-shared-office-writing-home-outdoor-with-laptop-vector-illustration_1284-30324.jpg?w=740&t=st=1677782661~exp=1677783261~hmac=23ca103fc3f4dcc5ba63d5682b4c6d41d120c8633db8b26cf93cb9b83d36e1d7"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Choose freelancers
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No job is too big or too small. We've got freelancers for jobs of any size or budget, across 1800+ skills.
                  </Typography>
                </CardContent>

              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{
                maxWidth: 345, m: 5, backgroundColor: 'transparent', ":hover": {
                  boxShadow: 15
                }
              }}>
                <CardMedia
                  component="img"
                  alt=""
                  height="190"
                  image="https://img.freepik.com/free-vector/vector-illustration-retro-style-hand-giving-money-other-hand_1284-42589.jpg?w=740&t=st=1677782693~exp=1677783293~hmac=0221ed0065b0f0d113f582ed9cd4006ce53d6d381ad5c6d48eca393c9c999f84"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">

                    Pay safely
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Only pay for work when it has been completed and you're 100% satisfied with the quality using our milestone payment system.
                  </Typography>
                </CardContent>

              </Card>
            </Grid>
          </Grid></Box>
        <Divider variant="middle" flexItem>
          {/* text can be added here  */}
        </Divider>

     

      {/* different section */}

      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: "left", m: 8, ml: 6, color: "grey" }}
       >What makes it impressive?</Typography>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Card sx={{
            maxWidth: 345, m: 5, backgroundColor: 'transparent', ":hover": {
              boxShadow: 15
            }
          }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-vector/portfolio-management-previous-projects-samples-works-catalog-skills-presentation-successful-graphic-designer-web-developer-cartoon-character_335657-1586.jpg?w=740&t=st=1677783010~exp=1677783610~hmac=a152c8f05ea0835c91a2f185573f3172ddfe802336783abcde7f1921def8fe65"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Browse portfolios
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Find professionals you can trust by browsing their samples of previous work and reading their profile reviews.
              </Typography>
            </CardContent>

          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{
            maxWidth: 345, m: 5, backgroundColor: 'transparent', ":hover": {
              boxShadow: 15
            }
          }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-vector/iso-certification-illustration_23-2148688045.jpg?w=740&t=st=1677783057~exp=1677783657~hmac=04b134c4e81429314eb7bf152e8c85a13f264ae2be80fbc98f8dd8da31dbaf3e"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Quality work
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Freelancer.com has by far the largest pool of quality freelancers globally- over 60 million to choose from.
              </Typography>
            </CardContent>

          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{
            maxWidth: 345, m: 5, backgroundColor: 'transparent', ":hover": {
              boxShadow: 15
            }
          }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-vector/benchmark-testing-benchmarking-software-product-performance-indicator-load-testing-performance-characteristics-competitive-products-test_335657-4511.jpg?w=740&t=st=1677783095~exp=1677783695~hmac=f5964465c8791d6f2f1ee17607e6cec99933ab4aef37d1d6001347685d8a2eb6"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Track progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Keep up-to-date and on-the-go with our time tracker, and mobile app. Always know what freelancers are up to.
              </Typography>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
      {/* </div> */}

      {/* video player */}

      <Divider variant="middle" flexItem>
        {/* text can be added here  */}
      </Divider>
      {/* <Typography
        variant="h3"
        xs={12} sm={4}
        component="h1"
        sx={{ textAlign: "left", m: 8, ml: 6, color: "grey" }}
        
      >How to Use our website?</Typography>
      <Grid container>
      
      <Grid item
      xs={6} sm={12}>
      <div sx={{ p: 20}}>
        <iframe width="560" height="420" sx={{ pb: 15 }} 
          src="https://www.youtube.com/embed/45Zm4WgVMcc" title="How to use HuntForLancers"
        >
        </iframe>
      </div>
      </Grid>
      </Grid> */}
      <Divider variant="middle" flexItem>
        {/* text can be added here  */}
      </Divider>

      {/* different section */}
      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: "left", m: 8, ml: 6, mb: 1, color: "grey" }}
       
      >Accomplish your goal by hiring
      </Typography>
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: "left", ml: 6, color: "grey" }}
          
      >from over 10+ different categories
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, m: 5 }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?w=740&t=st=1677774951~exp=1677775551~hmac=7078c2c44d5ced31c311911c3e99211e6d65ef82828ed898a0c0f2758ca60c93"
            sx={{height:175}}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Logo Design.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $30 USD in 1 day.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, m: 5 }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-vector/www-concept-illustration_114360-2143.jpg?w=740&t=st=1677775081~exp=1677775681~hmac=3c61d49ddafbef4135d4ff44dc89f1e1fcb19de7dba940b738d0d0f4bfbe573c"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Website.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $30 USD in 1 day.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, m: 5 }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-psd/premium-mobile-phone-screen-mockup-template_53876-65749.jpg?w=900&t=st=1677775135~exp=1677775735~hmac=522a8a65ffb2ac8bc27fcb62ecb194ddc1e585733089240a702c60e1166a0049"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Mobile Design.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $30 USD in 1 day.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, m: 5 }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg?w=996&t=st=1677781840~exp=1677782440~hmac=2271948df151e0b4374d926047f4dcaaf775878e0f1d0a952908944886c9e5fa"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Illustration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $30 USD in 1 day.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, m: 5 }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-vector/flat-design-content-management-system-illustration_23-2148811571.jpg?w=996&t=st=1677781935~exp=1677782535~hmac=9f3281c5e9ceeec13f54a81e3ea400706c702bfe2a0879c6f6edc17e86cb0e03"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                WordPress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $30 USD in 1 day.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, m: 5 }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-psd/woman-using-virtual-reality-glasses-touching-vr-interface-isolated-background-3d-illustration-cartoon-characters_1150-63066.jpg?w=996&t=st=1677781993~exp=1677782593~hmac=cc933f2f22d724c45ad0740cb4e7b44b5e44e7f75f6c22d7d1a0a29444e26d45"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                3D Modeling.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $30 USD in 1 day.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, m: 5 }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-vector/graphic-designer-workplace_23-2148136302.jpg?w=740&t=st=1677782090~exp=1677782690~hmac=4fb3a6e584015ccefd9a1d10b95ae7187988e3f1bf3fd67ceefda2109a7839dc"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Graphic Design.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $30 USD in 1 day.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, m: 5 }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-vector/packing-juice-from-exotic-durian-fruit_1441-957.jpg?w=740&t=st=1677782191~exp=1677782791~hmac=e4ff87d216a2ca8c007dd3652d13d8b20a9d4fb7df54b27bb4fb232121321e91"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Package Design.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $30 USD in 1 day.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ maxWidth: 345, m: 5 }}>
            <CardMedia
              component="img"
              alt=""
              height="190"
              image="https://img.freepik.com/free-vector/gamer-top-view-illustration_1284-21861.jpg?w=740&t=st=1677782257~exp=1677782857~hmac=8e980162cc91d637dfe77b82658184852df07450b1eb0775b48403ec63f7aa71"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Game Design.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $30 USD in 1 day.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Landing;
