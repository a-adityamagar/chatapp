import React from "react";

function Search() {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
      </div>
      <div className="userChat">
        <img src="https://up.yimg.com/ib/th?id=OIP.0_INywwz74o8LLO4Lz7vCAHaEo&pid=Api&rs=1&c=1&qlt=95&w=177&h=110" alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
}

export default Search;
