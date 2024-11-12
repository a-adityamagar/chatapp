import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Chats() {
  const [chats, setChats] = useState({}); // Using object to store chats
  const { currentUser } = useContext(AuthContext); // Get currentUser from context
  const { dispatch } = useContext(ChatContext); // Get dispatch function from context

  useEffect(() => {
    if (!currentUser?.uid) return; // If currentUser.uid is not available, stop fetching chats

    // Set up real-time listener to get user's chats
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      if (doc.exists()) {
        setChats(doc.data()); // Update chats with data from Firestore
      }
    });

    return () => unsub(); // Cleanup listener on component unmount
  }, [currentUser?.uid]); // Only run when currentUser.uid changes

  // Handle selecting a user and dispatch action to set active chat
  const handleSelect = (userInfo) => {
    if (userInfo) {
      dispatch({ type: "CHANGE_USER", payload: userInfo });
    }
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        .sort((a, b) => b[1]?.date - a[1]?.date) // Sort chats by date (most recent first)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1]?.userInfo)} // Select the user on click
          >
            <img
              src={chat[1]?.userInfo?.photoURL || "/default-avatar.png"} // Default avatar if photoURL is missing
              alt="user"
            />
            <div className="userChatInfo">
              <span>{chat[1]?.userInfo?.displayName || "Unknown User"}</span> {/* Fallback to "Unknown User" if displayName is missing */}
              <p>{chat[1]?.lastMessage?.text || "No messages"}</p> {/* Fallback to "No messages" if lastMessage is missing */}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Chats;
