import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat App</span>
            <span className='title'>Login</span>
            <form>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <button>Sign Up</button>
            </form>
            <p>Don't have and account? <Link to="/register">Register</Link> </p>
        </div>

    </div>
  )
}

export default Login;