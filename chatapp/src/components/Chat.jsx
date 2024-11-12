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
          <Icon icon="ph:video-camera-fill" style={{ color: "white" }} />
          <Icon icon="mingcute:user-add-fill" style={{ color: "white" }} />
          <Icon icon="ant-design:more-outlined" style={{ color: "white" }} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;