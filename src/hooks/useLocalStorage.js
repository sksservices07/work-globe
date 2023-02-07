import { useState, useEffect } from "react";

import useGunMessages from "./useGunRef";
import createHash from "../utils/getHash";

const PREFIX = "work-globe-";

const useLocalStorage = (key, userId, initialValue) => {
  const { gunRef } = useGunMessages();
  const prefixedKey = PREFIX + key;
  const [test, setTest] = useState([]);
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  // useEffect(() => {
  //   const ref = gunRef(userId);
  //   const contactsRef = gunRef(userId);

  //   setTest([])

  //   contactsRef.map().once((contact) => {
  //     if (contact?.id) {
  //       const roomId = createHash(userId, contact.id);
  //       const messagesRef = gunRef("rooms").get(roomId);
  //       const addr = contact.id;

  //       messagesRef.map().on((data) => {
  //         console.log(data);
  //         if (data?.sender && data?.content) {
  //           setTest((prev) => {
  //             const target = prev.find(
  //               (obj) =>
  //                 Array.isArray(obj.recipients) && obj.recipients.includes(addr)
  //             );

  //             if (Array.isArray(target?.messages)) {
  //               target.messages.push({
  //                 sender: data.sender,
  //                 text: data.content,
  //               });
  //               return prev;
  //             }

  //             return [
  //               {
  //                 recipients: [addr],
  //                 messages: [
  //                   {
  //                     sender: data.sender,
  //                     text: data.content,
  //                   },
  //                 ],
  //               },
  //             ];
  //           });
  //         }
  //       });
  //     }
  //   });
  //   return;
  //   // do somethinng
  //   ref.map().once((data, key) => {
  //     if (data?.id) {
  //       const addr = data.id;
  //       const ref = gunRef(userId).get(data.id);
  //       ref.map().once((data, key) => {
  //         if (data?.sender && data?.content) {
  //           setValue((prev) => {
  //             const target = prev.find(
  //               (obj) =>
  //                 Array.isArray(obj.recipients) && obj.recipients.includes(addr)
  //             );

  //             if (Array.isArray(target?.messages)) {
  //               target.messages.push({
  //                 sender: data.sender,
  //                 text: data.content,
  //               });
  //               return prev;
  //             }

  //             return [
  //               {
  //                 recipients: [addr],
  //                 messages: [
  //                   {
  //                     sender: data.sender,
  //                     text: data.content,
  //                   },
  //                 ],
  //               },
  //             ];
  //           });
  //         }
  //       });
  //     }
  //   });
  // }, [userId]);

  return [value, setValue];
};

export default useLocalStorage;
