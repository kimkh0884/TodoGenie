import React, {useState} from 'react';
import {register, login, saveAuthInfo} from "./api.js";
import MainFrame from "./MainFrame";
import RegisterPage from "./RegisterPage";
import "./all.css";
import GoogleButton from './GoogleButton.js';

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [directLoginFlag, setDirectLoginFlag] = useState(0);
  const [authinfoSaveFlag, setAuthInfoSaveFlag] = useState(0);
  const [pageNum, setPageNum]= useState(0);
  // 0: fail
  // 1: success
  // 2: register

  const unfold = () => {
    setDirectLoginFlag(1);
  }

  // trying login
  const tryLogin = () => {
    let id = document.getElementById("todogenie-login-id").value;
    if (id === "") {
      window.alert("ID is empty.");
      return;
    }
    let pw = document.getElementById("todogenie-login-pw").value;
    if (pw === "") {
      window.alert("PW is empty.");
      return;
    }

    let success = null;
    if (authinfoSaveFlag === 1) {
      success = (res) => {
        saveAuthInfo({id, pw});
        setUserId(res.data.userId);
        setPageNum(1);
      };
    }
    else {
      success = (res) => {
        setUserId(res.data.userId);
        setPageNum(1);
      };
    }
    
    login(id, pw, success,
      (msg) => {
        window.alert("Login is failed."+msg);
      });
  };

  const tryLoginWithGoogle = (res) => {
    let payload = JSON.parse(window.atob(res.credential.split(".")[1]));
    login(payload.email, payload.sub, 
      (res) => {
        setUserId(res.data.userId);
        setPageNum(1);
      },
      (msg) => {
        if (msg === "\nID is wrong.") {
          register(payload.name, payload.email, payload.sub, 
            () => {
              login(payload.email, payload.sub, 
                (res) => {
                  setUserId(res.data.userId);
                  setPageNum(1);
                }, 
                () => {});
            }, 
            () => {});
        }
        else {
          window.alert("Login is failed.");
        }
      });
  };

  const goRegisterPage = () => {
    setPageNum(2);
  };

  const revState = () => {
    if (authinfoSaveFlag === 0) {
      setAuthInfoSaveFlag(1);
    }
    else {
      setAuthInfoSaveFlag(0);
    }
  };

  if (pageNum === 0) {
    if (directLoginFlag === 0) {
      return (
        <div className="wholepage">
          <div className="todogenie-title-logo">To-do Genie</div>
          <button className="rectangle-10-1 margin-1vh align-center" onClick={unfold}>Sign in</button>
          <button className="rectangle-10-1 margin-1vh align-center" onClick={goRegisterPage}>Register</button>
          <GoogleButton tryLoginWithGoogle={tryLoginWithGoogle}/>
        </div>
      );
    }
    else {
      return (
        <div className="wholepage">
          <div className="todogenie-title-logo">To-do Genie</div>
          <div className="margin-1vh align-center">
            <button className="rectangle-2-1">ID</button>
            <input id="todogenie-login-id" className='rectangle-10-1 margin-left-1vw padding-both-1vw' placeholder="ID (essential)" />
          </div>
          <div className="margin-1vh align-center">
            <button className="rectangle-2-1">PW</button>
            <input id="todogenie-login-pw" type="password" className='rectangle-10-1 margin-left-1vw padding-both-1vw' placeholder="password (essential)" />
          </div>
          <div className="margin-1vh align-center">
            {authinfoSaveFlag === 0 ? <button className='rectangle-8-1 state-done' onClick={revState}>Not use auto-login</button> : <button className='rectangle-8-1 state-notyet' onClick={revState}>Use auto-login for 1 day</button>}
          </div>
          <button className="rectangle-10-1 margin-1vh align-center" onClick={tryLogin}>Sign in</button>
          <button className="rectangle-10-1 margin-1vh align-center" onClick={goRegisterPage}>Register</button>
          <GoogleButton tryLoginWithGoogle={tryLoginWithGoogle}/>
        </div>
      );
    }
    
  }
  else if (pageNum === 1) {
    return (
      <MainFrame user_id={userId} />
    );
  }
  else {
    return (
      <RegisterPage />
    );
  }
};

export default LoginPage;