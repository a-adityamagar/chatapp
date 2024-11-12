import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc
} from "firebase/firestore";

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!text.trim() && !img) return;
    if (!data.chatId) return;
    
    try {
      const chatRef = doc(db, "chats", data.chatId);
      
      const message = {
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Date.now(),
      };

      if (img) {
        const formData = new FormData();
        formData.append('file', img);
        formData.append('upload_preset', 'ml_default');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dipppi7yr/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        const uploadData = await response.json();
        message.img = uploadData.secure_url;
      }

      await updateDoc(chatRef, {
        messages: arrayUnion(message)
      });

      const userChatUpdate = {
        [`${data.chatId}.lastMessage`]: { text },
        [`${data.chatId}.date`]: serverTimestamp(),
      };

      await Promise.all([
        updateDoc(doc(db, "userChats", currentUser.uid), userChatUpdate),
        updateDoc(doc(db, "userChats", data.user.uid), userChatUpdate)
      ]);

      setText("");
      setImg(null);
    } catch (error) {
      console.log("Error details:", error);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyPress={(e) => e.key === "Enter" && handleSend(e)}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <Icon icon="bi:image" style={{color: "gray", fontSize: "24px"}} />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Input;
