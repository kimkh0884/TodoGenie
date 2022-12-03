import React, {useState} from 'react';
import DailyBoard from "./DailyBoard"
import WeeklyBoard from './WeeklyBoard';
import MonthlyBoard from "./MonthlyBoard";
import SearchedBoard from "./SearchedBoard";
import EditPage from './EditPage';
import "./all.css";

const MainPage = () => {
  const [boardNum, setBoardNum] = useState(0);
  const [prevBoardNum, setPrevBoardNum] = useState(0);
  const [keyword, setKeyword] = useState("");
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

  const showSearchedBoard = () => {
    let searchbar = document.getElementById("search-bar");
    let kw = searchbar.value;
    if (kw === "") {
      return;
    }
    searchbar.value = "";

    if (boardNum !== 3) {
      setPrevBoardNum(boardNum);
    }
    
    setKeyword(kw);
    setBoardNum(3);
  };

  const showEditPage = (data) => {
    if (boardNum !== 3) {
      setPrevBoardNum(boardNum);
    }
    setTodoProperties(data);
    setBoardNum(4);
  };

  const refreshAll = () => {
    setRefreshFlag(refreshFlag + 1);
  };

  if (boardNum === 0) {
    return (
      <div className="bodypage">
        <MenuBar showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} showSearchedBoard={showSearchedBoard} showEditPage={showEditPage} refreshAll={refreshAll} />
        <DailyBoard showEditPage={showEditPage}/>
      </div>
    );
  }
  else if (boardNum === 1) {
    return (
      <div className="bodypage">
        <MenuBar showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} showSearchedBoard={showSearchedBoard} showEditPage={showEditPage} refreshAll={refreshAll} />
        <WeeklyBoard showEditPage={showEditPage}/>
      </div>
    );
  }
  else if (boardNum === 2) {
    return (
      <div className="bodypage">
        <MenuBar showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} showSearchedBoard={showSearchedBoard} showEditPage={showEditPage} refreshAll={refreshAll} />
        <MonthlyBoard showEditPage={showEditPage}/>
      </div>
    );
  }
  else if (boardNum === 3) {
    return (
      <div className="bodypage">
        <MenuBar showDailyBoard={showDailyBoard} showWeeklyBoard={showWeeklyBoard} showMonthlyBoard={showMonthlyBoard} showSearchedBoard={showSearchedBoard} showEditPage={showEditPage} refreshAll={refreshAll} />
        <SearchedBoard showEditPage={showEditPage} keyword={keyword}/>
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

const MenuBar = ({showDailyBoard, showWeeklyBoard, showMonthlyBoard, showSearchedBoard, showEditPage, refreshAll}) => {
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
        <div className='flex-cell-4'>
          <input id="search-bar" className='search-bar padding-both-1vw margin-1vw align-center' placeholder='write a related word' />
        </div>
        <div className='flex-cell-1'>
          <div className='flex-row'>
            <div className='flex-cell-1'><button className='circle search-button margin-1vw align-center' onClick={showSearchedBoard} /></div>
            <div className='flex-cell-1'><button className='circle add-button margin-1vw align-center' onClick={addTodo} /></div>
            <div className='flex-cell-1'><button className='circle refresh-button margin-1vw align-center' onClick={refreshAll} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
