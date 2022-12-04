import React from 'react';
import { logout } from "./api";
import "./all.css";

const NavBar = ({user_id, showLoginPage, showSettingPage, showTutorialPage}) => {
  const tryLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      logout(
        () => {
          window.alert("Successfully logged out");
          showLoginPage();
        },
        () => {
          window.alert("Logout is failed.");
        });
    }
  };

  return (
    <div className = "headpage flex-row">
      <div className='flex-cell-1'><font className="todogenie-logo">To-do Genie</font></div>
      <div className='flex-cell-1'>
        <div className='floating-right'>
          <font className="system-text">{user_id}</font>
          <button className='rectangle-2-1 margin-1vw' onClick={tryLogout}>Logout</button>
          <button className='rectangle-2-1 margin-1vw' onClick={showSettingPage}>Setting</button>
          <button className='rectangle-2-1 margin-1vw' onClick={showTutorialPage}>Tutorial</button>        
        </div>
      </div>
    </div>
  );
};

export default NavBar;