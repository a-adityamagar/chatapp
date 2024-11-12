import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (!currentUser?.uid) return;

      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setChats(doc.data());
        }
      });

      return () => unsub();
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (userInfo) => {
    if (!userInfo) return;
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          const userInfo = chat[1]?.userInfo;
          return (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(userInfo)}
            >
              <img src={userInfo?.photoURL || "/default-avatar.png"} alt="" />
              <div className="userChatInfo">
                <span>{userInfo?.displayName || "Unknown User"}</span>
                <p>{chat[1]?.lastMessage?.text || ""}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Chats;
