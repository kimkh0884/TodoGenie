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
        style.textContent = "body {background-color: ivory;color: black;}\nbutton {background-color: #eeeeee;border-color: black;color: black;filter: invert(0%);}\ninput {background-color: ivory;border-color: black;color: black;}\n.system-text {color: black;}\n::placeholder {color: grey;opacity: 1;}\n.headpage {background-color: #dddddd;}\n.menubar {background-color: #dddddd;}\n.dailyboarditem, .weeklyboarditem, .monthlyboarditem {--bd-color: #000000;}\n.db-head, .wb-head, .wb-column-head, .mb-head, .mb-body-head, .mb-cell-head {--bd-color: #000000;}\n.wb-column, .mb-row, .mb-cell {--bd-color: #000000;}\n.add-button, .edit-button, .fold-button, .unfold-button, .delete-button, .search-button, .refresh-button {filter: invert(0%);}\n.state-done-circle, .state-done-rectangle {background-color: #99ff99;}\n.state-notyet {background-color: #ff6666;}";
        document.head.appendChild(style);
      }
      else {
        style.textContent = "body {background-color: #555555;color: white;}\nbutton {background-color: #bbbbbb;border-color: black;color: black;filter: invert(100%);}\ninput {background-color: #555555;border-color: white;color: white;}\n.system-text {color: white;}\n::placeholder {color: white;opacity: 1;}\n.headpage {background-color: #333333;}\n.menubar {background-color: #333333;}\n.dailyboarditem, .weeklyboarditem, .monthlyboarditem {--bd-color: #ffffff;}\n.db-head, .wb-head, .wb-column-head, .mb-head, .mb-body-head, .mb-cell-head {--bd-color: #ffffff;}\n.wb-column, .mb-row, .mb-cell {--bd-color: #ffffff;}\n.add-button, .edit-button, .fold-button, .unfold-button, .delete-button, .search-button, .refresh-button {filter: invert(100%);}\n.state-done-circle, .state-done-rectangle {background-color: #aa55aa;}\n.state-notyet {background-color: #00bbbb;}";
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
