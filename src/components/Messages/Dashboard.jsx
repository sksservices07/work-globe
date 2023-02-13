import React from "react";

import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

import {  useConversations } from "../../context/ConversationsProvider";

const Dashboard = () => {
  const { selectCurrentChatId  } = useConversations();

  return (
    <>
      <Sidebar />
      {selectCurrentChatId && <OpenConversation key={selectCurrentChatId} />}
    </>
  );
};

export default Dashboard;
