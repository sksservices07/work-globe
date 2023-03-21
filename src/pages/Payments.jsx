import { useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import JobPostModal from "../components/PostJobModal";
import { IconButton } from "@mui/material";
import NavBar from "../components/NavBar";
import { css } from "@emotion/react";
import BigNumber from "bignumber.js";
import PaymentIcon from "@mui/icons-material/Payment";
import AddCardIcon from "@mui/icons-material/AddCard";

import { CreateMilestone, MileStones } from "../components/Milestone";

const Payments = () => {
  const [navState, setNavState] = useState(0);

  return (
    <Box>
      <NavBar />
      <Grid container sx={{ height: "600px" }}>
        <Grid item xs={2}>
          <Card sx={{ height: "100%" }} variant="outlined">
            <CardContent>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setNavState(0)}>
                    <ListItemIcon>
                      <PaymentIcon />
                    </ListItemIcon>

                    <ListItemText primary="Milestones" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => setNavState(1)}>
                    <ListItemIcon>
                      <AddCardIcon />
                    </ListItemIcon>

                    <ListItemText primary="Create Milestone" />
                  </ListItemButton>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={10}>
          <Card sx={{ height: "100%" }} variant="outlined">
            <CardContent>
              {navState === 0 && <MileStones />}
              {navState === 1 && <CreateMilestone />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payments;
