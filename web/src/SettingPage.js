import React from 'react';

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
  const applyChangeAndExit = () => {
    if (window.confirm("Do you apply the modified settings?")) {
      exitSetting();
    }
  };

  const exitWithoutChange = () => {
    if (window.confirm("Do you want to exit without any change?")) {
      exitSetting();
    }
  };

  return (
    <div className = "settingpage">
      <MenuBar exitWithoutChange={exitWithoutChange} applyChangeAndExit={applyChangeAndExit} />
      <h1>Setting page</h1>
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