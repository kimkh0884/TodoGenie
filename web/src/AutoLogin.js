import React, {useState, useEffect} from 'react';
import {login, searchAuthInfo} from "./api.js";
import LoginPage from './LoginPage';
import MainFrame from './MainFrame';
import "./all.css";

const AutoLogin = () => {
  const [id, setId]= useState("");
  const [loginFlag, setFlag]= useState(0);

  // trying auto-login
  // 1: fail
  // 2: success
  const tryLogin = () => {    
    let authinfo = searchAuthInfo();
    if (authinfo != null) {
      login(authinfo.id, authinfo.pw,
        () => {
          setId(authinfo.id);
          setFlag(2);
        },
        (msg) => {
          setFlag(1);
        });
    }
    setFlag(1);
  }
  useEffect(tryLogin, []);

  // 0 (still doing auto-login) -> Initial
  // 1 (auto-login fail)        -> Login page
  // 2 (auto-login success)     -> MainFrame
  if (loginFlag === 0) {
    return (
      <div className="wholepage">
        <div className="todogenie-title-logo">To-do Genie</div>
        <h2 className='align-center system-text'>Auto-Login...</h2>
      </div>
    );
  }
  else if (loginFlag === 1) {
    return (
      <LoginPage />
    );
  }
  else {
    return (
      <MainFrame user_id={id}/>
    );
  }
  
};

export default AutoLogin;
