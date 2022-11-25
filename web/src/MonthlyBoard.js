import React, {useEffect} from 'react';

const MonthlyBoard = () => {
    const loadTodolist = () => {
      
    }
    useEffect(loadTodolist, []);
  
    return (
        <div className="monthlyboard">
            <MonthlyBoardItem title="test" start="2022-11-25:16:00" end="2022-11-25:17:00" state="Done" />
        </div>
    );
};
  
const MonthlyBoardItem = ({title, start, end, state}) => {
    return (
        <div className="monthlyboarditem">
            <h1>Title: {title}</h1>
            <h2>Start: {start}</h2>
            <h2>End: {end}</h2>
            <h3>State: {state}</h3>
            <button className='circle-button'>...</button>
        </div>
    );
};

export default MonthlyBoard;