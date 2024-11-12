import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";


function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img src="https://up.yimg.com/ib/th?id=OIP.0_INywwz74o8LLO4Lz7vCAHaEo&pid=Api&rs=1&c=1&qlt=95&w=177&h=110" alt="" />
        <span>John</span>
        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  );
}

export default Navbar;
