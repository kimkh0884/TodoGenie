import React, {useState} from 'react';
import NavBar from "./NavBar";
import MainPage from "./MainPage";
import SettingPage from "./SettingPage";
import TutorialPage from "./TutorialPage";
import LoginPage from './LoginPage';

const MainFrame = () => {
    const [loginFlag, setLoginFlag] = useState(1);
    const [pageNum, setPageNum] = useState(0);

    if (loginFlag === 1) {
        if (pageNum === 0) {
            return (
                <div className="wholepage">
                    <NavBar setLoginFlag={setLoginFlag} setPageNum={setPageNum} />
                    <MainPage />
                </div>
            );
        }
        else if (pageNum === 1) {
            return (
                <div className="wholepage">
                    <NavBar setLoginFlag={setLoginFlag} setPageNum={setPageNum} />
                    <SettingPage />
                </div>
            );
        }
        else {
            return (
                <div className="wholepage">
                    <NavBar setLoginFlag={setLoginFlag} setPageNum={setPageNum} />
                    <TutorialPage />
                </div>
            );
        }
    }
    else {
        <LoginPage />
    }
};

export default MainFrame;