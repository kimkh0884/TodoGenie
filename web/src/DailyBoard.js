import React, {useState} from 'react';
import { loadTodo, deleteTodo } from './api';

const sampleData = [
    {
        id: 0,
        title: "sample0",
        start: "2022-11-22 00:00",
        end: "2022-11-22 01:00",
        state: 0
    },
    {
        id: 1,
        title: "sample1",
        start: "2022-11-22 01:00",
        end: "2022-11-22 02:00",
        state: 0
    },
    {
        id: 2,
        title: "veryveryverylongnamesample",
        start: "2022-11-22 02:00",
        end: "2022-11-22 03:00",
        state: 1
    }
];

const dateToInt = (date) => {
    return ((date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate());
};

const intToString = (dtint) => {
    return (parseInt(dtint / 10000) + "-" + parseInt((dtint % 10000) / 100) + "-" + (dtint % 100));
};

const DailyBoard = ({showEditPage}) => {
    const today = new Date();
    const [focusedDate, setFocusedDate] = useState(dateToInt(today));
    const [rmFlag, setRmFlag] = useState(0);

    const oneDayBefore = () => {
        let dt = new Date(intToString(focusedDate));
        dt.setDate(dt.getDate() - 1);
        setFocusedDate(dateToInt(dt));
    };

    const oneDayAfter = () => {
        let dt = new Date(intToString(focusedDate));
        dt.setDate(dt.getDate() + 1);
        setFocusedDate(dateToInt(dt));
    };

    const loadTodolist = () => {
        let startdt = new Date(intToString(focusedDate)+" 00:00");
        let enddt = new Date(intToString(focusedDate)+" 23:59");

        let res = loadTodo(startdt.getTime(), enddt.getTime());
        return res;
    };

    const removeTodo = (id) => {
        deleteTodo(id);
        setRmFlag(rmFlag + 1);
    };
  
    return (
        <div className="dailyboard">
            <div className='db-head'>
                <div className='flex-cell-1'><button className='rectangle-4-1 align-center margin-1vw' onClick={oneDayBefore}>Previous Day</button></div>
                <div className='flex-cell-1'><button className='rectangle-10-1 align-center margin-1vw'>{intToString(focusedDate)}</button></div>
                <div className='flex-cell-1'><button className='rectangle-4-1 align-center margin-1vw' onClick={oneDayAfter}>Next Day</button></div>
            </div>
            {loadTodolist().map((todoitem) => (
                <DailyBoardItem key={todoitem.id} showEditPage={showEditPage} removeTodo={removeTodo} id={todoitem.id} title={todoitem.title} start={todoitem.start} end={todoitem.end} state={todoitem.state} />
            ))}
        </div>
    );
};
  
const DailyBoardItem = ({showEditPage, removeTodo, id, title, start, end, state}) => {
    const [moreFlag, setFlag] = useState(0);
    const [currState, setState] = useState(state);

    const unfold = () => {
        setFlag(1);
    };

    const fold = () => {
        setFlag(0);
    };

    const revState = () => {
        if (currState === 0) {
            setState(1);
        }
        else {
            setState(0);
        }
    };
    
    const __showEditPage = () => {
        showEditPage(id);
    };

    const __removeTodo = () => {
        removeTodo(id);
    };

    if (moreFlag === 0) {
        return (
            <div className="dailyboarditem">
                <div className='flex-row'>
                    <div className='dbi-text-space'><h1 title={title} className='dbi-title'>{title}</h1></div>
                    <div className='dbi-text-space'>
                        <h3 className='dbi-time'>
                            Start : {start}<br />
                            End : {end}
                        </h3>
                    </div>
                </div>
                {currState === 0 ? <button className='circle margin-1vw state-notyet floating-left' onClick={revState} /> : <button className='circle margin-1vw state-done-circle floating-left' onClick={revState} />}
                <button className="circle margin-1vw unfold-button" onClick={unfold} />
            </div>
        );
    }
    else {
        return (
            <div className="dailyboarditem">
                <div className='flex-row'>
                    <div className='dbi-text-space'><h1 title={title} className='dbi-title'>{title}</h1></div>
                    <div className='dbi-text-space'>
                        <h3 className='dbi-time'>
                            Start : {start}<br />
                            End : {end}
                        </h3>
                    </div>
                </div>
                {currState === 0 ? <button className='circle margin-1vw state-notyet floating-left' onClick={revState} /> : <button className='circle margin-1vw state-done-circle floating-left' onClick={revState} />}
                <button className="circle margin-1vw fold-button" onClick={fold} />
                <button className="circle margin-1vw edit-button" onClick={__showEditPage} />
                <button className="circle margin-1vw delete-button" onClick={__removeTodo} />
            </div>
        );
    }
};

export default DailyBoard;