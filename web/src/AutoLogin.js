import React, {useState, useEffect} from 'react';
import "./all.css";
import LoginPage from './LoginPage';
import MainFrame from './MainFrame';

// keep logged-in state with cookie
const createCookie = () => {};
const removeCookie = () => {};

const AutoLogin = () => {
  const [loginFlag, setFlag]= useState(0);

  // trying auto-login
  // 1: fail
  // 2: success
  const tryLogin = () => {
    setTimeout(
      () => setFlag(1),
      2000
    );
  }
  useEffect(tryLogin, []);

  // 0 (still doing auto-login) -> Initial
  // 1 (auto-login fail)        -> Login page
  // 2 (auto-login success)     -> MainFrame
  if (loginFlag === 0) {
    return (
      <div className="wholepage">
        <div className="todogenie-title-logo">To-do Genie logo</div>
        <h2 className='align-center'>Auto-Login...</h2>
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
      <MainFrame />
    );
  }
  
};

export default AutoLogin;
