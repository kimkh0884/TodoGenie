import React, {useState} from 'react';
import DailyBoard from "./DailyBoard"
import WeeklyBoard from './WeeklyBoard';
import MonthlyBoard from "./MonthlyBoard";

const MainPage = () => {
  const [boardNum, setBoardNum] = useState(0);

  if (boardNum === 0) {
    return (
      <div className="bodypage">
        <MenuBar setBoardNum={setBoardNum}/>
        <DailyBoard />
      </div>
    );
  }
  else if (boardNum === 1) {
    return (
      <div className="bodypage">
        <MenuBar setBoardNum={setBoardNum}/>
        <WeeklyBoard />
      </div>
    );
  }
  else {
    return (
      <div className="bodypage">
        <MenuBar setBoardNum={setBoardNum}/>
        <MonthlyBoard />
      </div>
    );
  }
  
};

const MenuBar = ({setBoardNum}) => {
  const showDailyBoard = () => {
    setBoardNum(0);
  };

  const showWeeklyBoard = () => {
    setBoardNum(1);
  };

  const showMonthlyBoard = () => {
    setBoardNum(2);
  };

  return (
    <div className="headpage flex-row">
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={showDailyBoard}>Daily</button></div>
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={showWeeklyBoard}>Weekly</button></div>
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={showMonthlyBoard}>Monthly</button></div>
    </div>
  );
}

export default MainPage;
