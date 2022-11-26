import React, {useState} from 'react';
import NavBar from "./NavBar";
import MainPage from "./MainPage";
import SettingPage from "./SettingPage";
import TutorialPage from "./TutorialPage";
import LoginPage from './LoginPage';

const MainFrame = () => {
    const [loginFlag, setLoginFlag] = useState(1);
    const [pageNum, setPageNum] = useState(0);

    const showLoginPage = () => {
        setLoginFlag(0);
    };

    const showSettingPage = () => {
        setPageNum(1);
    };

    const showTutorialPage = () => {
        setPageNum(2);
    };

    const exitCurrPage = () => {
        setPageNum(0);
    };

    if (loginFlag === 1) {
        if (pageNum === 0) {
            return (
                <div className="wholepage">
                    <NavBar showLoginPage={showLoginPage} showSettingPage={showSettingPage} showTutorialPage={showTutorialPage} />
                    <MainPage />
                </div>
            );
        }
        else if (pageNum === 1) {
            return (
                <div className="wholepage">
                    <NavBar showLoginPage={showLoginPage} showSettingPage={showSettingPage} showTutorialPage={showTutorialPage} />
                    <SettingPage exitSetting={exitCurrPage} />
                </div>
            );
        }
        else {
            return (
                <div className="wholepage">
                    <NavBar showLoginPage={showLoginPage} showSettingPage={showSettingPage} showTutorialPage={showTutorialPage} />
                    <TutorialPage exitTutorial={exitCurrPage} />
                </div>
            );
        }
    }
    else {
        return (
            <LoginPage />
        );
    }
};

export default MainFrame;