import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <Icon icon="ph:video-camera-fill" className="icon" />
          <Icon icon="mingcute:user-add-fill" className="icon" />
          <Icon icon="ant-design:more-outlined" className="icon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
