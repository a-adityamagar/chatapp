import React from "react";
import { Icon } from "@iconify/react";

function Input() {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="send">
      <Icon icon="bi:paperclip" style={{color: "gray" , fontSize: "24px"}} />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <Icon icon="stash:image-light"  style={{color: "gray" , fontSize: "24px"}} />


        </label>
        <button>Send</button>
      </div>
    </div>
  );
}

export default Input;
