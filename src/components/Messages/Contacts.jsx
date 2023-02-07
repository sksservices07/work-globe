import { useAccount } from "wagmi";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import { useContacts } from "../../context/ContactsProvider";
import { useConversations } from "../../context/ConversationsProvider";
import createHash from "../../utils/getHash";

function Contacts() {
  const { address } = useAccount();
  const { contacts } = useContacts();
  const { selectCurrentChatId, selectConversationIndex } = useConversations();

  return (
    <List>
      {contacts.map((contact, index) => (
        <ListItem key={contact.id + index} disablePadding>
          <ListItemButton
            onClick={() => {
              selectConversationIndex(index);
              selectCurrentChatId(createHash(contact.id, address));
            }}
          >
            <ListItemText primary={contact.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default Contacts;
