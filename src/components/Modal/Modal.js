import React, { useState, useEffect } from "react";
import "./Modal.css";
import {
  Button
} from "@mui/material";
import { Box, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
// import { SocketProvider } from "../../context/SocketProvider";
// import { ContactsProvider } from "../../context/ContactsProvider";
import {
  ConversationsProvider,
  useConversations,
} from "../../context/ConversationsProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import createHash from "../../utils/getHash";
import Dashboard from "../MessagesModal/Dashboard";

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

function Modal({user, name}) {
  const [modal, setModal] = useState(false);
  const [currentChatID, setCurrentChatID] = useState('');
  const { address } = useAccount();
  const location = useLocation();
  
  const toggleModal = () => {
    setCurrentChatID(createHash(user, address))
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>

      <Button
        variant="contained"
        sx={{ width: "80%", p: 2 }}
        onClick={toggleModal}
      >
        Chat Now
      </Button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Chat With: {name} </h2>
            {/* <SocketProvider id={address}> */}
              {/* <ContactsProvider> */}
                <ConversationsProvider id={address}>
                  <ThemeProvider theme={theme}>
                    <Box sx={{ flexGrow: 1, m: 2 }}>
                      <Grid container spacing={2}>
                        <Dashboard
                          chatID={currentChatID}
                        />
                      </Grid>
                    </Box>
                  </ThemeProvider>
                </ConversationsProvider>
              {/* </ContactsProvider> */}
            {/* </SocketProvider> */}
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}

    </>
  );
}

export default Modal;
