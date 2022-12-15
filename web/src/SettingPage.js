import React, {useEffect, useState} from 'react';
import "./all.css";

/*
Profile for the account that the user is signed in.
B. Screen
i. Dark mode: On/Off/System Default.
ii. Notifications: On/Off
iii. Font: Provided Fonts/System Default
iv. Text size: controlled by a slider with percentage.
v. Sorting To-dos
1. Sort as completion: On/Off
2. Add new from the top: On/Off
vi. Calendar view
1. Start with Sunday: On/Off
2. Red color for Sunday: On/Off
3. Blue color for Saturday: On/Off
4. Red color for a legal holiday: On/Off
C. Contact e-mail for feedbacks
D. Information
i. Terms of Use
ii. Privacy Policy
iii. Open Source used
E. Sign out button
*/

const SettingPage = ({exitSetting}) => {
  const [checkedFlag, setCheckedFlag] = useState((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 1 : 0);

  const getCurrentSettings = () => {
    let regex = new RegExp("settings=([^;]*)");
    if (regex.test(document.cookie)) {
      let result = regex.exec(document.cookie);
      let settings = JSON.parse((result[0]).substring(9));
      setCheckedFlag(settings.darkmode);
    }
  };
  useEffect(getCurrentSettings, []);

  const applyChangeAndExit = () => {
    if (window.confirm("Do you apply the modified settings?")) {
      let settings = {
        darkmode: checkedFlag
      };
      let dt = new Date();
      dt.setDate(dt.getDate()+365);

      document.cookie = "settings="+JSON.stringify(settings)+";path=/;expires="+dt.toUTCString()+";";

      const style = document.createElement('style');
      if (checkedFlag === 0) {
        style.textContent = "body {background-color: ivory;color: black;}\nbutton {background-color: #eeeeee;border-color: black;color: black;filter: invert(0%);}\ninput {background-color: ivory;border-color: black;color: black;}\n.system-text {color: black;}\n::placeholder {color: grey;opacity: 1;}\n.headpage {background-color: #dddddd;}\n.menubar {background-color: #dddddd;}\n.dailyboarditem, .weeklyboarditem, .monthlyboarditem {--bd-color: #000000;}\n.db-head, .wb-head, .wb-column-head, .mb-head, .mb-body-head, .mb-cell-head {--bd-color: #000000;}\n.wb-column, .mb-row, .mb-cell {--bd-color: #000000;}\n.add-button, .edit-button, .fold-button, .unfold-button, .delete-button, .search-button, .refresh-button {filter: invert(0%);}\n.state-done-circle, .state-done-rectangle {background-color: #99ff99;}\n.state-notyet {background-color: #ff6666;}";
        document.head.appendChild(style);
      }
      else {
        style.textContent = "body {background-color: #555555;color: white;}\nbutton {background-color: #bbbbbb;border-color: black;color: black;filter: invert(100%);}\ninput {background-color: #555555;border-color: white;color: white;}\n.system-text {color: white;}\n::placeholder {color: white;opacity: 1;}\n.headpage {background-color: #333333;}\n.menubar {background-color: #333333;}\n.dailyboarditem, .weeklyboarditem, .monthlyboarditem {--bd-color: #ffffff;}\n.db-head, .wb-head, .wb-column-head, .mb-head, .mb-body-head, .mb-cell-head {--bd-color: #ffffff;}\n.wb-column, .mb-row, .mb-cell {--bd-color: #ffffff;}\n.add-button, .edit-button, .fold-button, .unfold-button, .delete-button, .search-button, .refresh-button {filter: invert(100%);}\n.state-done-circle, .state-done-rectangle {background-color: #aa55aa;}\n.state-notyet {background-color: #00bbbb;}";
        document.head.appendChild(style);
      }

      exitSetting();
    }
  };

  const exitWithoutChange = () => {
    if (window.confirm("Do you want to exit without any change?")) {
      exitSetting();
    }
  };

  const revState = () => {
    if (checkedFlag === 0) {
      setCheckedFlag(1);
    }
    else {
      setCheckedFlag(0);
    }
  };

  return (
    <div className = "settingpage">
      <MenuBar exitWithoutChange={exitWithoutChange} applyChangeAndExit={applyChangeAndExit} />
      <div className='align-center margin-1vw'>
        <button className='rectangle-4-1'>Dark mode</button>
        {(checkedFlag === 1) ? <button className='rectangle-10-1 margin-left-1vw padding-both-1vw state-done-rectangle' onClick={revState}>Yes</button> : <button className='rectangle-10-1 margin-left-1vw padding-both-1vw state-notyet' onClick={revState}>No</button>}    
      </div>
    </div>
  );
};

const MenuBar = ({exitWithoutChange, applyChangeAndExit}) => {
  return (
    <div className="menubar flex-row">
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={exitWithoutChange}>Cancel</button></div>
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={applyChangeAndExit}>Apply</button></div>
    </div>
  );
};

export default SettingPage;