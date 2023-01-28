import React from "react";

import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

import {  useConversations } from "../../context/ConversationsProvider";

const Dashboard = () => {
  const { selectedConversation } = useConversations();

  return (
    <>
      <Sidebar />
      {selectedConversation && <OpenConversation />}
    </>
  );
};

export default Dashboard;
