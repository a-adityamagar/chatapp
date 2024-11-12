import React, { useState, useContext, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import Message from './Message';

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (!data.chatId) return;

    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        const messagesData = doc.data().messages || [];
        // Ensure each message has required properties
        const validMessages = messagesData.map(msg => ({
          ...msg,
          id: msg.id || Math.random().toString(),
          photoURL: msg.photoURL || '',  // Provide default empty string
        }));
        setMessages(validMessages);
      }
    });

    return () => {
      unSub && unSub();
    };
  }, [data.chatId]);

  return (
    <div className='messages'>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}

export default Messages;
