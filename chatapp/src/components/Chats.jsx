import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Chats() {
  const [chats, setChats] = useState({}); 
  const { currentUser } = useContext(AuthContext); 
  const { dispatch } = useContext(ChatContext); 

  useEffect(() => {
    if (!currentUser?.uid) return; 

  
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      if (doc.exists()) {
        setChats(doc.data());
      }
    });

    return () => unsub(); 
  }, [currentUser?.uid]); 

 
  const handleSelect = (userInfo) => {
    if (userInfo) {
      dispatch({ type: "CHANGE_USER", payload: userInfo });
    }
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        .sort((a, b) => b[1]?.date - a[1]?.date) 
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1]?.userInfo)} 
          >
            <img
              src={chat[1]?.userInfo?.photoURL || "/default-avatar.png"}
              alt="user"
            />
            <div className="userChatInfo">
              <span>{chat[1]?.userInfo?.displayName || "Unknown User"}</span>
              <p>{chat[1]?.lastMessage?.text || "No messages"}</p> 
            </div>
          </div>
        ))}
    </div>
  );
}

export default Chats;
