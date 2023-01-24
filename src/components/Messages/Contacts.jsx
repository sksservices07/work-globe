import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import { useContacts } from "../../context/ContactsProvider";

function Contacts() {
  const { contacts } = useContacts();

  return (
    <List>
      {contacts.map((contact, index) => (
        <ListItem key={contact.id + index} disablePadding>
          <ListItemButton>
            <ListItemText primary={contact.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default Contacts;
