import React from 'react';

const NavBar = ({showLoginPage, showSettingPage, showTutorialPage}) => {
  const tryLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      showLoginPage();
    }
  };

  return (
    <div className = "headpage flex-row">
      <div className='flex-cell-1'><font className="todogenie-logo">To-do Genie</font></div>
      <div className='flex-cell-1'>
        <div className='floating-right'>
          <b>User id</b>
          <button className='rectangle-2-1 margin-1vw' onClick={tryLogout}>Logout</button>
          <button className='rectangle-2-1 margin-1vw' onClick={showSettingPage}>Setting</button>
          <button className='rectangle-2-1 margin-1vw' onClick={showTutorialPage}>Tutorial</button>        
        </div>
      </div>
    </div>
  );
};

export default NavBar;