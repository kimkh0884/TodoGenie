import React, {useState} from 'react';
import {register} from "./api.js";
import AutoLogin from './AutoLogin';
import LoginPage from './LoginPage';
import "./all.css";

const RegisterPage = () => {
  const [registerFlag, setFlag]= useState(0);
  // 0: not registered
  // 1: registered
  // 2: return to login page

  // trying registration
  const tryRegister = () => {
    let name = document.getElementById("todogenie-register-name").value;
    if (name === "") {
      window.alert("Name is empty.");
      return;
    }
    let id = document.getElementById("todogenie-register-id").value;
    if (id === "") {
      window.alert("ID is empty.");
      return;
    }
    let pw = document.getElementById("todogenie-register-pw").value;
    if (pw === "") {
      window.alert("PW is empty.");
      return;
    }
    
    register(name, id, pw, 
      () => {
        window.alert("Successfully registered.");
        setFlag(1);
      }, 
      () => {
        window.alert("Registration failed.");
      });
  };

  const cancelRegister = () => {
    setFlag(2);
  };

  if (registerFlag === 0) {
    return (
      <div className="wholepage">
        <div className="todogenie-title-logo">To-do Genie</div>
        <div className="margin-1vh align-center">
          <button className="rectangle-2-1">Name</button>
          <input id="todogenie-register-name" className='rectangle-10-1 margin-left-1vw padding-both-1vw' placeholder="username (essential)" />
        </div>
        <div className="margin-1vh align-center">
          <button className="rectangle-2-1">ID</button>
          <input id="todogenie-register-id" className='rectangle-10-1 margin-left-1vw padding-both-1vw' placeholder="id (essential)" />
        </div>
        <div className="margin-1vh align-center">
          <button className="rectangle-2-1">PW</button>
          <input type="password" id="todogenie-register-pw" className='rectangle-10-1 margin-left-1vw padding-both-1vw' placeholder="password (essential)" />
        </div>
        <button className="rectangle-10-1 align-center margin-1vh" onClick={tryRegister}>Register</button>
        <button className="rectangle-10-1 align-center margin-1vh" onClick={cancelRegister}>Cancel</button>
      </div>
    );
  }
  else if (registerFlag === 1) {
    return (
      <AutoLogin />
    );
  }
  else {
    return (
      <LoginPage />
    );
  }
};

export default RegisterPage;