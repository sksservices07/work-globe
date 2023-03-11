import React, { useEffect } from "react";

import OpenConversation from "./OpenConversation";
// import Sidebar from "./Sidebar";

import {  useConversations } from "../../context/ConversationsProvider";

const Dashboard = ({chatID}) => {
  const { selectCurrentChatId, currentChatId  } = useConversations();
  console.log('its coming with : ', chatID, currentChatId)

  useEffect(() => {
    selectCurrentChatId(chatID)
  }, [chatID]);

  return (
    <>
      {/* <Sidebar name={name} address = {address} /> */}
      {currentChatId===chatID && <OpenConversation key={currentChatId} />}
    </>
  );
};

export default Dashboard;
