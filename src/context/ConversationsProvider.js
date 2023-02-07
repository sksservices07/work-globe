import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocalStorage, useGunRef } from "../hooks";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";
import createHash from "../utils/getHash";

export const ConversationsContext = createContext();

export const useConversations = () => useContext(ConversationsContext);

export const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    id,
    []
  );
  const { gunRef } = useGunRef();
  const [selectConversationIndex, setSelectConversationIndex] = useState(0);
  const [currentChatId, setCurrentChatId] = useState(null);
  const { contacts } = useContacts();
  const socket = useSocket();

  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    // socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  const saveMessageToGun = (sender, recipients, text) => {
    const chatId = createHash(recipients[0], sender);
    const dbRef = gunRef(`messages/${chatId}`);

    const messageObject = {
      sender,
      text,
    };

    dbRef.set(messageObject);
  };

  const sendMessage = (recipients, text) => {
    // socket.emit("send-message", { recipients, text });
    saveMessageToGun(id, recipients, text);
    addMessageToConversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return {
        id: recipient,
        name,
      };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;

      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectConversationIndex],
    selectConversationIndex: setSelectConversationIndex,
    createConversation,
    sendMessage,
    currentChatId,
    selectCurrentChatId: setCurrentChatId,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
