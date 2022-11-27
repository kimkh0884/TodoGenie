import React, {useState} from 'react';
import AutoLogin from './AutoLogin';
import LoginPage from './LoginPage';

const RegisterPage = () => {
  const [registerFlag, setFlag]= useState(0);
  // 0: not registered
  // 1: registered
  // 2: return to login page

  // trying login
  const tryRegister = () => {
    setFlag(1);
  };

  const cancelRegister = () => {
    setFlag(2);
  };

  if (registerFlag === 0) {
    return (
      <div className="wholepage">
        <div className="todogenie-title-logo">To-do Genie logo</div>
        <div className="margin-1vh align-center">
          <button className="rectangle-2-1">ID</button>
          <input className='rectangle-10-1' placeholder="ID (essential)" />
        </div>
        <div className="margin-1vh align-center">
          <button className="rectangle-2-1">PW</button>
          <input className='rectangle-10-1' placeholder="password (essential)" />
        </div>
        <button className="rectangle-10-1 align-center margin-1vh" onClick={tryRegister}>Register!</button>
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