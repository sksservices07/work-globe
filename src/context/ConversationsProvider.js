import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
  useReducer
} from "react";
import { useLocalStorage } from "../hooks";
import { useContacts } from "./ContactsProvider";
// import { useSocket } from "./SocketProvider";
import { useAccount } from 'wagmi'
import Gun from "gun";
import { API } from "../backend";

import createHash from "../utils/getHash";

export const ConversationsContext = createContext();

export const useConversations = () => useContext(ConversationsContext);

// Port 5050 is the port of the gun server we previously created
const gun = Gun({
  peers: [`${API}/gun`],
});

// The messages array will hold the chat messages
const currentState = {
  messages: [],
};

// This reducer function will edit the messages array
const reducer = (state, message) => {
  return {
    messages: [message, ...state.messages],
  };
};


export const ConversationsProvider = ({ id, children }) => {
  const { address } = useAccount();
  const { contacts } = useContacts();

  const [state, dispatch] = useReducer(reducer, currentState);

  // const [conversations, setConversations] = useLocalStorage(
  //   "conversations",
  //   []
  // );

  const [msgs, setMsgs] = useState([])
  const [conversations, setConversations] = useState([])

  const [selectConversationIndex, setSelectConversationIndex] = useState(0);
  // const socket = useSocket();

  
  useEffect(() => {

    const app = async () => {
    if (!address || !contacts.length) return;

    console.log("all conversations HERE : ", conversations);
    
    console.log("CONTACTS", contacts)

    contacts.map(async (contact, index) => {
      const chatId = createHash(address, contact.id)
      console.log(chatId)
      const messagesRef = gun.get(chatId).get("MESSAGES");

      await messagesRef.map().on((m) => {
        setMsgs((prev) => [
          ...prev,
          { sender: m.sender,
            text: m.content },
        ]);
      })

      console.log(msgs)

      setConversations((prev) => ([
        ...prev,
        { recipients:[contact.id] , messages: msgs},
      ]));

    })
  }

  // [
  //   ...prev,
  //   { recipients:[contact.id] , messages: [...m, {
  //     sender: m.sender,
  //     text: m.content
  //   }]}
  // ]

    //   await messagesRef
    //   .map().once(function async (msg, i) {
    //     console.log("msg is :", msg, i);
    //     // newMessages.push({ recipients:[contact.id] , messages: [{
    //     //   sender: msg.sender,
    //     //   text: msg.content
    //     // }]})
    //     setMsgs((prev) => [
    //       ...prev,
    //       { sender: msg.sender,
    //         text: msg.content },
    //     ]);
    //   })
    // })
      // if (i===0) {
      //   console.log("contactID :", [contact.id]);
      //   console.log("msg first msg:", msg, i);
      //   setConversations((prev) => ([
      //     ...prev,
      //     { recipients:[contact.id] , messages: [{
      //       sender: msg.sender,
      //       text: msg.content
      //     }]},
      //   ]));
      // } else {
      //   console.log("contactID :", [contact.id]);
      //   console.log("msg second msg:", msg, i);
      //   setConversations((prev) => ([
      //     ...prev,
      //     { recipients: [contact.id], messages: [{
      //       sender: msg.sender,
      //       text: msg.content
      //     }]},
      //   ]));
    // }

      // newMessages.push(msg.content)
      // console.log("newMessages: ", newMessages)
    app();

    

    
  }, [contacts]);

  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        // all the conversations are coming for all chatIDs
        console.log("prevConversations: ", prevConversations)
        let madeChange = false;
        const newMessage = { sender, text };

        const newConversations = prevConversations.map((conversation) => {
          console.log("conversation in addMessagetoconv: ", conversation)
          console.log("conversation.recipients: ", conversation.recipients)
          console.log("recipients: ", recipients)
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            console.log("coming in")

            const chatId = createHash(recipients[0], sender)
            // add the new msg here to gun
            const messagesRef = gun.get(chatId).get("MESSAGES");
            console.log(messagesRef);

            // the message object to be sent/saved
            const messageObject = {
              sender: sender,
              content: text
            };

            // this function sends/saves the message onto the network
            messagesRef.set(messageObject);

            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          console.log("coming in madechange")
          console.log(newConversations)
          return newConversations;
        } else {
          console.log("coming in not madechange")
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  const sendMessage = (recipients, text) => {
    // socket.emit("send-message", { recipients, text });
    console.log("going to addMessageToConversation from sendMessage")
    addMessageToConversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    console.log("conversation in fc:", conversation)
    const recipients = conversation.recipients.map((recipient) => {
      console.log("recipient: ", recipient)
      const contact = contacts.find((contact) => {
        console.log("recipient: ", recipient)
        console.log("contact.id: ", contact.id)
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