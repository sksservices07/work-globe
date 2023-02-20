import * as React from "react";

import { Box, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAccount } from "wagmi";
import { IconButton } from "@mui/material";
import Navbar from "../components/NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Messages/Sidebar";
import { ContactsProvider } from "../context/ContactsProvider";
import {
  ConversationsProvider,
  useConversations,
} from "../context/ConversationsProvider";
import { SocketProvider } from "../context/SocketProvider";
import { useLocalStorage } from "../hooks";
import Dashboard from "../components/Messages/Dashboard";

const theme = createTheme({
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: "#1fe47a",
  //       },
  //     },
  //   },
  // },
});

function Messages() {
  const { address } = useAccount();
  const location = useLocation();

  return (
    <>
      <Navbar />
      {address ? (
        <SocketProvider id={address}>
          <ContactsProvider>
            <ConversationsProvider id={address}>
              <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1, m: 2 }}>
                  <Grid container spacing={2}>
                    <Dashboard
                      name={
                        location.state!=null
                          ? location.state.applicantName
                          : ""
                      }
                      address={
                        location.state!=null
                          ? location.state.applicantAddress
                          : ""
                      }
                    />
                  </Grid>
                </Box>
              </ThemeProvider>
            </ConversationsProvider>
          </ContactsProvider>
        </SocketProvider>
      ) : (
        <></>
      )}
    </>
  );
}

export default Messages;
