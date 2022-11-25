import React, {useEffect} from 'react';

const WeeklyBoard = () => {
    const loadTodolist = () => {
      
    }
    useEffect(loadTodolist, []);
  
    return (
        <div className="weeklyboard">
            <WeeklyBoardItem title="test" start="2022-11-25:16:00" end="2022-11-25:17:00" state="Done" />
        </div>
    );
};
  
const WeeklyBoardItem = ({title, start, end, state}) => {
    return (
        <div className="weeklyboarditem">
            <h1>Title: {title}</h1>
            <h2>Start: {start}</h2>
            <h2>End: {end}</h2>
            <h3>State: {state}</h3>
            <button className='circle-button'>...</button>
        </div>
    );
};

export default WeeklyBoard;