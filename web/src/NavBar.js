import React from 'react';

const NavBar = ({setLoginFlag, setPageNum}) => {
  const tryLogout = () => {
    if (window.confirm("Logout?")) {
      setLoginFlag(0);
    }
  };

  const showSettingPage = () => {
    setPageNum(1);
  }

  const showTutorialPage = () => {
    setPageNum(2);
  }

  return (
    <div className = "headpage flex-row">
      <div className='flex-cell-1'><b>To-do Genie</b></div>
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