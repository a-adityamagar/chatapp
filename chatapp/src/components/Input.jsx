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
} from "firebase/firestore";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat_uploads");
  formData.append("cloud_name", "dipppi7yr");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dipppi7yr/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

function Input() {
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if ((!text.trim() && !media) || !data.chatId) return;

    try {
      let mediaUrl = null;

      if (media) {
        mediaUrl = await uploadToCloudinary(media);
      }

      const message = {
        id: uuid(),
        text: text.trim(),
        senderId: currentUser.uid,
        date: Date.now(),
        img: mediaUrl
      };


      const chatRef = doc(db, "chats", data.chatId);
      await updateDoc(chatRef, {
        messages: arrayUnion(message)
      });

   
      const userChatUpdate = {
        [`${data.chatId}.lastMessage`]: { text: text.trim() },
        [`${data.chatId}.date`]: serverTimestamp(),
      };

      await Promise.all([
        updateDoc(doc(db, "userChats", currentUser.uid), userChatUpdate),
        updateDoc(doc(db, "userChats", data.user.uid), userChatUpdate)
      ]);

   
      setText("");
      setMedia(null);
      
      
      const fileInput = document.getElementById("file");
      if (fileInput) {
        fileInput.value = "";
      }

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend(e)}
      />
      
      <div className="send">
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => setMedia(e.target.files[0])}
        />
        
        <label htmlFor="file">
          <Icon 
            icon="bi:image" 
            style={{color: "gray", fontSize: "24px"}}
          />
        </label>
        
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Input;
