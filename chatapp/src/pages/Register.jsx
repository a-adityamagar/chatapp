import React, { useState } from 'react';
import "../App.scss";
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      // Create user first
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create user document in Firestore with all data
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + displayName,
      });

      // Update profile with display name and avatar
      await updateProfile(res.user, {
        displayName,
        photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + displayName,
      });

      // Create empty user chats document
      await setDoc(doc(db, "userChats", res.user.uid), {});
      
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Chat App</span>
        <span className='title'>Register</span>
        <form onSubmit={handlesubmit}>
          <input 
            type="text" 
            placeholder='display name' 
            required 
            minLength={3}
          />
          <input 
            type="email" 
            placeholder='email' 
            required 
          />
          <input 
            type="password" 
            placeholder='password' 
            required 
            minLength={6}
          />
          <button disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
          {err && <span className="error">Something went wrong</span>}
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
