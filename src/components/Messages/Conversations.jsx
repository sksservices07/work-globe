import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useConversations } from "../../context/ConversationsProvider";

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations();
  console.log("here")
  console.log(conversations)

  return (
    <List>
      {conversations.map((conversation, index) => (
        <ListItem key={index + "-conver"} disablePadding>
          <ListItemButton onClick={() => selectConversationIndex(index)}>
            <ListItemText
              primary={conversation.recipients.map((r) => r.name).join(", ")}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Conversations;
