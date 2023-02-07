import { useAccount } from "wagmi";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import { useConversations } from "../../context/ConversationsProvider";
import createHash from "../../utils/getHash";

const Conversations = () => {
  const { address } = useAccount();
  const { conversations, selectConversationIndex, selectCurrentChatId } =
    useConversations();

  return (
    <List>
      {conversations.map((conversation, index) => (
        <ListItem key={index + "-conver"} disablePadding>
          <ListItemButton
            onClick={() => {
              selectConversationIndex(index);
              selectCurrentChatId(
                createHash(conversation.recipients[0].id, address)
              );
            }}
          >
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
