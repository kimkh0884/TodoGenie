import React, {useState} from 'react';
import DailyBoard from "./DailyBoard"
import WeeklyBoard from './WeeklyBoard';
import MonthlyBoard from "./MonthlyBoard";
import EditPage from './EditPage';

const MainPage = () => {
  const [boardNum, setBoardNum] = useState(0);
  const [prevBoardNum, setPrevBoardNum] = useState(0);
  var [todo_id, setTodoId] = useState(0);
  
  const showDailyBoard = () => {
    setBoardNum(0);
  };

  const showWeeklyBoard = () => {
    setBoardNum(1);
  };

  const showMonthlyBoard = () => {
    setBoardNum(2);
  };

  const showEditPage = (id) => {
    setPrevBoardNum(boardNum);
    setTodoId(id);
    setBoardNum(3);
  };

  if (boardNum === 0) {
    return (
      <div className="bodypage">
        <MenuBar showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} />
        <DailyBoard showEditPage={showEditPage}/>
      </div>
    );
  }
  else if (boardNum === 1) {
    return (
      <div className="bodypage">
        <MenuBar showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} />
        <WeeklyBoard showEditPage={showEditPage}/>
      </div>
    );
  }
  else if (boardNum === 2) {
    return (
      <div className="bodypage">
        <MenuBar showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} />
        <MonthlyBoard showEditPage={showEditPage}/>
      </div>
    );
  }
  else {
    return (
      <div className="bodypage">
        <EditPage showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} prevBoard={prevBoardNum} id={todo_id} />
      </div>
    );
  }
};

const MenuBar = ({showDailyBoard, showWeeklyBoard, showMonthlyBoard}) => {
  return (
    <div className="headpage flex-row">
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vw align-center' onClick={showDailyBoard}>Daily</button></div>
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vw align-center' onClick={showWeeklyBoard}>Weekly</button></div>
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vw align-center' onClick={showMonthlyBoard}>Monthly</button></div>
    </div>
  );
}

export default MainPage;
