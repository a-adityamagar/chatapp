import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
        setErr(false);
      } else {
        setErr(true);
      }
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const chatDoc = await getDoc(chatDocRef);

      if (!chatDoc.exists()) {
      
        await setDoc(chatDocRef, { messages: [] });

        const userChatData = {
          [combinedId]: {
            userInfo: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            date: serverTimestamp(),
          },
        };

        await updateDoc(doc(db, "userChats", currentUser.uid), userChatData);
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      } else {
   
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [`${combinedId}.date`]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [`${combinedId}.date`]: serverTimestamp(),
        });
      }

  
      setUser(null);
      setUsername("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      {err && <span className="error">User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
