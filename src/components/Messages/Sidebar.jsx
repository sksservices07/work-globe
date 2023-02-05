import React, { useState, useRef } from "react";

import { Tab, Box, Button, Tabs, TextField } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";

import TabPanel from "./TabPanel";
import PromptModal from "./Modal";
import Conversations from "./Conversations";

import { useDisclosure } from "../../hooks";
import { useContacts } from "../../context/ContactsProvider";
import { useConversations } from "../../context/ConversationsProvider";

function a11yProps(index) {
  return {
    id: `message-tab-${index}`,
    "aria-controls": `message-tabpanel-${index}`,
  };
}

function Sidebar() {
  const walletAddrRef = useRef();
  const nameRef = useRef();

  const [value, setValue] = useState(0);

  const { createContact } = useContacts();
  const { createConversation } = useConversations();

  // contact modal
  const {
    open: openContact,
    onClose: onCloseContact,
    onOpen: onOpenConContact,
  } = useDisclosure();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCreateContact = () => {
    console.log(walletAddrRef.current.value, nameRef.current.value);
    createContact(walletAddrRef.current.value, nameRef.current.value);
    console.log(nameRef.current.value, walletAddrRef.current.value);
    createConversation([walletAddrRef.current.value]);
  };

  return (
    <Box
      sx={{
        width: "20%",
        height: "83vh",
        borderRight: 1,
        borderColor: "divider",
      }}
      position="relative"
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={0} aria-label="message sidebar" centered>
          <Tab icon={<MessageIcon />} label="Contacts" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Conversations />
      </TabPanel>

      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: "0",
          left: "0",
        }}
        color="primary"
        size="large"
        fullWidth
        onClick={onOpenConContact}
      >
        New Contact
      </Button>

      {/* Modal for Contact */}
      <PromptModal
        title="Create contact"
        open={openContact}
        onClose={onCloseContact}
      >
        <TextField
          id="wallet-address-input"
          label="Name"
          variant="outlined"
          fullWidth
          inputRef={nameRef}
          required
        />

        <TextField
          id="wallet-address-input"
          label="Wallet Address"
          variant="outlined"
          fullWidth
          inputRef={walletAddrRef}
          required
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
          onClick={handleCreateContact}
        >
          Add to contract
        </Button>
      </PromptModal>
    </Box>
  );
}

export default Sidebar;
