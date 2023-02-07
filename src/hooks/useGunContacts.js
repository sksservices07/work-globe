import { useState, useEffect } from "react";
import Gun from "gun";
import { API } from "../backend";

const gun = Gun({
  peers: [`${API}/gun`],
});

const useGunMessages = (chatId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId) return;
    setMessages([])
    gun
      .get(`messages/${chatId}`)
      .map()
      .once((gunData, key) => {
        const data = {
          sender: gunData.sender,
          text: gunData.text,
        };
        setMessages((prevMessages) => [...prevMessages, data]);
      });
  }, [chatId]);

  return { messages };
};

export default useGunMessages;
