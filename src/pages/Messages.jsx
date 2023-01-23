import * as React from "react";

import { Box, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Navbar from "../components/NavBar";
import Sidebar from "../components/Messages/Sidebar";
import { ContactsProvider } from "../context/ContactsProvider";
import { ConversationsProvider } from "../context/ConversationsProvider";
import { SocketProvider } from "../context/SocketProvider";
import { useLocalStorage } from "../hooks";

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
  const [id, setId] = useLocalStorage("id");

  return (
    <>
      <Navbar />
      {id ? (
        <SocketProvider id={id}>
          <ContactsProvider>
            <ConversationsProvider id={id}>
              <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1, m: 2 }}>
                  <Grid container spacing={2}>
                    <Sidebar />
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
