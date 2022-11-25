import React, {useState} from 'react';
import AutoLogin from './AutoLogin';

const RegisterPage = () => {
  const [registerFlag, setFlag]= useState(0);
  // 0: not registered
  // 1: registered

  // trying login
  const tryRegister = () => {
    setFlag(1);
  };

  if (registerFlag === 0) {
    return (
      <div className="wholepage">
        <div className="todogenie-title-logo">To-do Genie logo</div>
        <div className="align-center margin-1vh">
          <button className="rectangle-2-1">ID</button>
          <input className='rectangle-10-1' placeholder="ID (essential)" />
        </div>
        <div className="align-center margin-1vh">
          <button className="rectangle-2-1">PW</button>
          <input className='rectangle-10-1' placeholder="password (essential)" />
        </div>
        <button className="rectangle-10-1 align-center" onClick={tryRegister}>Register!</button>
      </div>
    );
  }
  else {
    return (
      <AutoLogin />
    );
  }
};

export default RegisterPage;