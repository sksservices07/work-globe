import React, { useState } from "react";
import PropTypes from "prop-types";

import { Tab, Typography, Box, Button, Tabs } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import ContactsIcon from "@mui/icons-material/Contacts";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`message-tabpanel-${index}`}
      aria-labelledby={`message-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `message-tab-${index}`,
    "aria-controls": `message-tabpanel-${index}`,
  };
}

function Sidebar() {
  const [value, setValue] = useState(0);

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
        >
          New Contact
        </Button>
      )}
    </Box>
  );
}

export default Sidebar;
