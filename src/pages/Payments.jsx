import * as React from "react";
import { useAccount, useNetwork } from "wagmi";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import JobPostModal from "../components/PostJobModal";
import { IconButton } from "@mui/material";
import NavBar from "../components/NavBar";
import { css } from "@emotion/react";
import BigNumber from "bignumber.js";
import { Button } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

const Payments = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <NavBar />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Payments;
