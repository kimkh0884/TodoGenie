import React, {useState} from 'react';
import DailyBoard from "./DailyBoard"
import WeeklyBoard from './WeeklyBoard';
import MonthlyBoard from "./MonthlyBoard";
import EditPage from './EditPage';

const MainPage = () => {
  const [boardNum, setBoardNum] = useState(0);
  const [prevBoardNum, setPrevBoardNum] = useState(0);
  const [todoProperties, setTodoProperties] = useState({});
  const [refreshFlag, setRefreshFlag] = useState(0);
  
  const showDailyBoard = () => {
    setBoardNum(0);
  };

  const showWeeklyBoard = () => {
    setBoardNum(1);
  };

  const showMonthlyBoard = () => {
    setBoardNum(2);
  };

  const showEditPage = (data) => {
    setPrevBoardNum(boardNum);
    setTodoProperties(data);
    setBoardNum(3);
  };

  const refreshAll = () => {
    setRefreshFlag(refreshFlag + 1);
  };

  if (boardNum === 0) {
    return (
      <div className="bodypage">
        <MenuBar showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} showEditPage={showEditPage} refreshAll={refreshAll} />
        <DailyBoard showEditPage={showEditPage}/>
      </div>
    );
  }
  else if (boardNum === 1) {
    return (
      <div className="bodypage">
        <MenuBar showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} showEditPage={showEditPage} refreshAll={refreshAll} />
        <WeeklyBoard showEditPage={showEditPage}/>
      </div>
    );
  }
  else if (boardNum === 2) {
    return (
      <div className="bodypage">
        <MenuBar showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} showEditPage={showEditPage} refreshAll={refreshAll} />
        <MonthlyBoard showEditPage={showEditPage}/>
      </div>
    );
  }
  else {
    return (
      <div className="bodypage">
        <EditPage showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} prevBoard={prevBoardNum} data={todoProperties} />
      </div>
    );
  }
};

const MenuBar = ({showDailyBoard, showWeeklyBoard, showMonthlyBoard, showEditPage, refreshAll}) => {
  const addTodo = () => {
    showEditPage({id:-1});
  };

  return (
    <div>
      <div className="menubar flex-row">
        <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={showDailyBoard}>Daily</button></div>
        <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={showWeeklyBoard}>Weekly</button></div>
        <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={showMonthlyBoard}>Monthly</button></div>
      </div>
      <div className="menubar flex-row">
        <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={addTodo}>Add</button></div>
        <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={refreshAll}>Refresh</button></div>
      </div>
    </div>
  );
}

export default MainPage;
