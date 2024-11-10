import React from 'react';
import "../App.css";
import {Icon} from '@iconify/react';

function Register() {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat App</span>
            <span className='title'>Register</span>
            <form>
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input type="file" id='file' style={{display:'none'}}/>
                <label htmlFor='file'>
                <Icon icon="material-symbols:image"  style={{color:" black"}} />
                <span>Add an avatar</span>
                </label>
                <button>Sign Up</button>
            </form>
            <p>You do have an account? Login</p>
        </div>

    </div>
  )
}

export default Register;