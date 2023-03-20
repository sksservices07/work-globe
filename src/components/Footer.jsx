import * as React from "react";
import { css } from "@emotion/react";
import { Box, IconButton, Paper, Typography, Grid } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { styled } from "@mui/material/styles";
import { spacing } from "@mui/system";
import { hover } from "@testing-library/user-event/dist/hover";

import { Divider } from "@mui/material";
import LogoImage from "../img/logo192.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#7FB4AD",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

<<<<<<< Updated upstream
=======
const backgroundStyles = css`
  background-color: #7FB4AD;
  
`;

>>>>>>> Stashed changes
const Footer = () => {
  return (
    <>
      {/* <h1>tmkc</h1> */}
      <div css={backgroundStyles}>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{ alignText: "left", color: "white",backgroundColor:"#7FB4AD" }}
        >
<<<<<<< Updated upstream
          <Box sx={{ display: "flex", gap: "2" }}>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ textAlign: "left", ml: 1, pt: 2 }}
            >
              {/* Follow us on : */}
              <IconButton>
                <FacebookRoundedIcon sx={{ color: "white" }} />
              </IconButton>

              <IconButton>
                <TwitterIcon sx={{ color: "white" }} />
              </IconButton>

              <IconButton>
                <LinkedInIcon sx={{ color: "white" }} />
              </IconButton>

              <IconButton>
                <InstagramIcon sx={{ color: "white" }} />
              </IconButton>

              <IconButton>
                <YouTubeIcon sx={{ color: "white" }} />
              </IconButton>
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={0} sx={{ backgroundColor: "#595959" }}>
=======
          <Divider variant="middle" flexItem>
            {/* text can be added here  */}
          </Divider>
          
            <Box sx={{ display: "flex", gap: "2" }}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ textAlign: "left", ml: 1, pt: 2 }}
              >
                {/* Follow us on : */}
                <IconButton >
                  <FacebookRoundedIcon sx={{ color: "black" }} />
                </IconButton>
                <IconButton>
                  <TwitterIcon sx={{ color: "black" }} />
                </IconButton>
                <IconButton>
                  <LinkedInIcon sx={{ color: "black" }} />
                </IconButton>
                <IconButton>
                  <InstagramIcon sx={{ color: "black" }} />
                </IconButton>
                <IconButton>
                  <YouTubeIcon sx={{ color: "black" }} />
                </IconButton>
              </Typography>
            </Box>
        </Box>
        
        <Grid container spacing={0} sx={{ backgroundColor: "#7FB4AD" }}>
>>>>>>> Stashed changes
          <Grid item xs={6}>
            <Item variant="outline" square>
              {/* <Typography
                variant="h6"
                component="p"
                sx={{ textAlign: "left", ml: 1, color: "white" }}
              >
                Product by:
              </Typography> */}
<<<<<<< Updated upstream
              <img
                src={LogoImage}
                style={{ width: "170px", height: "25px" }}
                sx={{ mr: 50 }}
                alt=""
              />
=======
              {/* <img
                src={require("../img/logo192.png")}
                width={200}
                height={200}
                sx={{ mr: 80 }}
                alt="" /> */}
>>>>>>> Stashed changes
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item variant="outline" square>
              <Box
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ textAlign: "left", ml: 1, color: "white" }}
                >
                  Resources:
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  sx={{ textAlign: "left", ml: 1, color: "white" }}
                >
                  Help and Support
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  sx={{ textAlign: "left", ml: 1, color: "white" }}
                >
                  Blog
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  sx={{ textAlign: "left", ml: 1, color: "white" }}
                >
                  Community
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  sx={{ textAlign: "left", ml: 1, color: "white" }}
                >
                  Affiliate Program
                </Typography>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item variant="outline" square>
              <Typography
                variant="h6"
                component="p"
                sx={{ textAlign: "left", ml: 1, color: "white" }}
<<<<<<< Updated upstream
              >
                HuntForLancers
=======
              >HuntForLancers
>>>>>>> Stashed changes
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{ textAlign: "left", ml: 1, color: "white" }}
              >
                For Talent
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{ textAlign: "left", ml: 1, color: "white" }}
              >
                Find Work
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{ textAlign: "left", ml: 1, color: "white" }}
              >
                Find Freelance work WorldWide
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{ textAlign: "left", ml: 1, color: "white" }}
              >
                Work in USA
              </Typography>
            </Item>
          </Grid>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
        </Grid>
        <Typography
          variant="h6"
          component="p"
<<<<<<< Updated upstream
          sx={{ color: "white", backgroundColor: "#595959", pt: 4 }}
=======
          sx={{ color: "white", backgroundColor: "#7FB4AD ", pt: 4 }}
>>>>>>> Stashed changes
        >
          HuntForLancers
        </Typography>
        
        {/* <Divider variant="middle" flexItem/> */}
        <Typography
          variant="subtitle1"
          component="p"
          sx={{ color: "white", backgroundColor: "black", pt: 2, pb: 2 }}
          style={{
            fontSize: 20,
          }}
        >
          ©2023 Copyright
        </Typography>
      </Box>
      </div>
    </>
  );
};

export default Footer;
