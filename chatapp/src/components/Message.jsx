import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isOwner = message?.senderId === currentUser?.uid;
  const photoURL = isOwner ? currentUser?.photoURL : data?.user?.photoURL;
  const messageTime = message?.date ? new Date(message.date).toLocaleTimeString() : '';

  return (
    <div
      ref={ref}
      className={`message ${isOwner ? "owner" : ""}`}
    >
      <div className="messageInfo">
        <img
          src={photoURL || "/default-avatar.png"}
          alt="user avatar"
        />
        <span>{messageTime}</span>
      </div>
      <div className="messageContent">
        {message?.text && <p>{message.text}</p>}
        {message?.img && <img src={message.img} alt="message attachment" />}
      </div>
    </div>
  );
}

export default Message;
