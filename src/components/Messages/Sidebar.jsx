import React, { useState } from "react";

import { Tab, Box, Button, Tabs, TextField } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import ContactsIcon from "@mui/icons-material/Contacts";

import TabPanel from "./TabPanel";
import PromptModal from "./Modal";

import { useDisclosure } from "../../hooks";

function a11yProps(index) {
  return {
    id: `message-tab-${index}`,
    "aria-controls": `message-tabpanel-${index}`,
  };
}

function Sidebar() {
  const [value, setValue] = useState(0);
  // conversation modal
  const {
    open: openConver,
    onClose: onCloseConver,
    onOpen: onOpenConver,
  } = useDisclosure();
  // contact modal
  const {
    open: openContact,
    onClose: onCloseContact,
    onOpen: onOpenConContact,
  } = useDisclosure();

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="message sidebar"
        >
          <Tab icon={<MessageIcon />} label="Conversations" {...a11yProps(0)} />
          <Tab icon={<ContactsIcon />} label="Contacts" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Conversations
      </TabPanel>
      <TabPanel value={value} index={1}>
        Contacts
      </TabPanel>

      {value === 0 ? (
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
          onClick={onOpenConver}
        >
          New Conversation
        </Button>
      ) : (
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
      )}

      {/* Modal for conversation */}
      <PromptModal
        title="Create conversation"
        open={openConver}
        onClose={onCloseConver}
      >
        <Button variant="contained" color="primary">
          Create
        </Button>
      </PromptModal>

      {/* Modal for Contact */}
      <PromptModal
        title="Create contact"
        open={openContact}
        onClose={onCloseContact}
      >
        <form>
          <TextField
            id="wallet-address-input"
            label="Wallet Address"
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem" }}
          >
            Add to contract
          </Button>
        </form>
      </PromptModal>
    </Box>
  );
}

export default Sidebar;
