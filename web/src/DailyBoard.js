import React, {useState, useEffect} from 'react';
import { loadTodo, editTodo, deleteTodo } from './api';
import "./all.css";

const dateToInt = (date) => {
    return ((date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate());
};

const intToString = (dtint) => {
    return (parseInt(dtint / 10000) + "-" + parseInt((dtint % 10000) / 100) + "-" + (dtint % 100));
};

const DailyBoard = ({showEditPage}) => {
    const today = new Date();
    const [todoList, setTodoList] = useState([]);
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

        loadTodo(startdt.getTime(), enddt.getTime(), 
            (res) => {
                console.log(res);
                setTodoList(res);
            },
            () => {
                setTodoList([]);
            });
    };
    useEffect(loadTodolist, [focusedDate]);

    const removeTodo = (id) => {
        deleteTodo(id, 
            () => {
                setRmFlag(rmFlag + 1);
            },
            () => {
                window.alert("Removing the to-do is failed.");
            });
    };
  
    return (
        <div className="dailyboard">
            <div className='db-head'>
                <div className='flex-cell-1'><button className='rectangle-4-1 align-center margin-1vw' onClick={oneDayBefore}>Previous Day</button></div>
                <div className='flex-cell-1'><button className='rectangle-10-1 align-center margin-1vw'>{intToString(focusedDate)}</button></div>
                <div className='flex-cell-1'><button className='rectangle-4-1 align-center margin-1vw' onClick={oneDayAfter}>Next Day</button></div>
            </div>
            {todoList.map((todoitem) => (
                <DailyBoardItem key={todoitem._id} showEditPage={showEditPage} removeTodo={removeTodo} id={todoitem._id} title={todoitem.title} start={todoitem.start} end={todoitem.end} state={todoitem.state} />
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
            editTodo(id, title, start, end, 1,
                () => {
                    setState(1);
                },
                () => {
                    window.alert("Changing the state is failed.");
                });
        }
        else {
            editTodo(id, title, start, end, 0,
                () => {
                    setState(0);
                },
                () => {
                    window.alert("Changing the state is failed.");
                });
        }
    };
    
    const __showEditPage = () => {
        showEditPage({
            id: id,
            title: title,
            start: start,
            end: end,
            state: state
        });
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