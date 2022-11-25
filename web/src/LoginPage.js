import React, {useState} from 'react';
import MainFrame from "./MainFrame";
import RegisterPage from "./RegisterPage";

const LoginPage = () => {
  const [pageNum, setPageNum]= useState(0);
  // 0: fail
  // 1: success
  // 2: register

  // trying login
  const tryLogin = () => {
    setPageNum(1);
  };

  const goRegisterPage = () => {
    setPageNum(2);
  };

  if (pageNum === 0) {
    return (
      <div className="wholepage">
      <div className="todogenie-title-logo">To-do Genie logo</div>
        <button className="rectangle-10-1 margin-1vh align-center" onClick={tryLogin}>Sign in with Google</button>
        <button className="rectangle-10-1 margin-1vh align-center" onClick={goRegisterPage}>Register</button>
      </div>
    );
  }
  else if (pageNum === 1) {
    return (
      <MainFrame />
    );
  }
  else {
    return (
      <RegisterPage />
    );
  }
};

export default LoginPage;