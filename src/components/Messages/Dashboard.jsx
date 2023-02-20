import React from "react";

import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

import {  useConversations } from "../../context/ConversationsProvider";

const Dashboard = ({name,address}) => {
  const { selectCurrentChatId  } = useConversations();

  return (
    <>
      <Sidebar name={name} address = {address} />
      {selectCurrentChatId && <OpenConversation key={selectCurrentChatId} />}
    </>
  );
};

export default Dashboard;
