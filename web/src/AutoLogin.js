import React, {useState, useEffect} from 'react';
import {checkLoggedIn, login, searchAuthInfo} from "./api.js";
import LoginPage from './LoginPage';
import MainFrame from './MainFrame';
import "./all.css";

const AutoLogin = () => {
  const [id, setId]= useState("");
  const [loginFlag, setFlag]= useState(0);

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
  };

  const applySettings = () => {
    let regex = new RegExp("settings=([^;]*)");

    if (regex.test(document.cookie)) {
      let result = regex.exec(document.cookie);
      let settings = JSON.parse((result[0]).substring(9));

      const style = document.createElement('style');
      if (settings.darkmode === 0) {
        style.textContent = "body {\nbackground-color: ivory;\n}\nbutton {\nbackground-color: lightgreen;\n}";
        document.head.appendChild(style);
      }
      else {
        style.textContent = "body {\nbackground-color: darkslategray;\n}\nbutton {\nbackground-color: green;\n}";
        document.head.appendChild(style);
      }
    }
  };

  const initiate = () => {
    applySettings();
    checkLoggedIn((userId) => {
      setId(userId);
      setFlag(2);
      }, tryLogin);
  };
  useEffect(initiate, []);

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
