import { useState, useCallback } from "react";
import {
  Box,
  Button,
  TextareaAutosize,
  List,
  ListItemButton,
  ListItem,
  ListItemText
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import ContactsIcon from "@mui/icons-material/Contacts";

import { useConversations } from "../../context/ConversationsProvider";

const OpenConversation = () => {
  const [text, setText] = useState("");
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  };

  return (
    <Box
      sx={{
        width: "60%",
        height: "83vh",
        borderRight: 1,
        borderColor: "divider",
      }}
      position="relative"
    >
      <List sx={{
        overflowY: "scroll",
        height: "80%",
      }}>
        {selectedConversation.messages.map((message, index) => (
          <>
            <ListItem
              disablePadding
              ref={
                selectedConversation.messages.length - 1 === index
                  ? setRef
                  : null
              }
              key={index}
            >
              <ListItemButton component="span">
                <ListItemText primary={message.text} />
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-right" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </ListItemButton>
            </ListItem>
          </>
        ))}
      </List>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
          }}
        >
          <TextareaAutosize
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ height: "50px", fontSize: "1rem", resize: "none" }}
          />

          <Button variant="contained" type="submit">
            Send
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default OpenConversation;
