import React, {useState, useEffect} from 'react';
import { loadTodo, editTodo, deleteTodo } from './api';
import "./all.css";

const dateToInt = (date) => {
    return ((date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate());
};

const intToString = (date) => {
    return (parseInt(date / 10000) + "-" + parseInt((date % 10000) / 100) + "-" + (date % 100));
};

const intToMMDD = (dtint) => {
    return (parseInt((dtint % 10000) / 100) + "-" + (dtint % 100));
};

const intToDOW = (dtint) => {
    let dt = new Date(intToString(dtint));
    let dow = dt.getDay();
    
    switch(dow) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thr";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return "default";
    }
};

const startOfWeek = (date) => {
    let dow = date.getDay();
    date.setDate(date.getDate() - dow);
    return date;
};

let focusedDates = [0, 0, 0, 0, 0, 0, 0];

const fillFocusedDates = (focusedDate) => {
    let dt = new Date(intToString(focusedDate));

    for (let i = 0; i < 7; ++i) {
        focusedDates[i] = dateToInt(dt);
        dt.setDate(dt.getDate() + 1);
    }
};

const WeeklyBoard = ({showEditPage}) => {
    const today = new Date();
    const [focusedDate, setFocusedDate] = useState(dateToInt(startOfWeek(today)));

    fillFocusedDates(focusedDate);
    useEffect(() => {fillFocusedDates(focusedDate)}, [focusedDate]);

    const oneWeekBefore = () => {
        let dt = new Date(intToString(focusedDate));
        dt.setDate(dt.getDate() - 7);
        setFocusedDate(dateToInt(dt));
    };

    const oneWeekAfter = () => {
        let dt = new Date(intToString(focusedDate));
        dt.setDate(dt.getDate() + 7);
        setFocusedDate(dateToInt(dt));
    };
    
    return (
        <div className='weeklyboard'>
            <div className='wb-head'>
                <div className='flex-cell-1'><button className='rectangle-10-1 align-center margin-05vw' onClick={oneWeekBefore}>Previous Week</button></div>
                <div className='flex-cell-1'><button className='rectangle-10-1 align-center margin-05vw' onClick={oneWeekAfter}>Next Week</button></div>
            </div>
            <div className="wb-body">
                <WeeklyBoardColumn date={focusedDates[0]} showEditPage={showEditPage} />
                <WeeklyBoardColumn date={focusedDates[1]} showEditPage={showEditPage} />
                <WeeklyBoardColumn date={focusedDates[2]} showEditPage={showEditPage} />
                <WeeklyBoardColumn date={focusedDates[3]} showEditPage={showEditPage} />
                <WeeklyBoardColumn date={focusedDates[4]} showEditPage={showEditPage} />
                <WeeklyBoardColumn date={focusedDates[5]} showEditPage={showEditPage} />
                <WeeklyBoardColumn date={focusedDates[6]} showEditPage={showEditPage} />
            </div>
        </div>
    );
};

const WeeklyBoardColumn = ({date, showEditPage}) => {
    const [todoList, setTodoList] = useState([]);
    const [rmFlag, setRmFlag] = useState(0);

    const loadTodolist = () => {
        let startdt = new Date(intToString(date)+" 00:00");
        let enddt = new Date(intToString(date)+" 23:59");

        loadTodo(startdt.getTime(), enddt.getTime(), 
            (res) => {
                setTodoList(res);
            },
            () => {
                setTodoList([]);
            });
    }
    useEffect(loadTodolist, [date]);
    
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
        <div className='wb-column'>
            <div className='wb-column-head flex-row'>
                <div className='flex-cell-1'><button className='rectangle-small-2-1 align-center margin-05vw'>{intToDOW(date)}</button></div>
                <div className='flex-cell-1'><button className='rectangle-small-2-1 align-center margin-05vw'>{intToMMDD(date)}</button></div>
            </div>
            {todoList.map((todoitem) => (
                <WeeklyBoardItem key={todoitem.id} showEditPage={showEditPage} removeTodo={removeTodo} id={todoitem.id} title={todoitem.title} start={todoitem.start} end={todoitem.end} state={todoitem.state} />
            ))}
        </div>
    );
};
  
const WeeklyBoardItem = ({showEditPage, removeTodo, id, title, start, end, state}) => {
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
            editTodo(id, title, start, end, currState,
                () => {
                    setState(1);
                },
                () => {
                    window.alert("Changing the state is failed.");
                });
        }
        else {
            editTodo(id, title, start, end, currState,
                () => {
                    setState(0);
                },
                () => {
                    window.alert("Changing the state is failed.");
                });
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
            <div className="weeklyboarditem">
                {currState === 0 ? <button className='circle-small margin-05vw state-notyet' onClick={revState} /> : <button className='circle-small margin-05vw state-done-circle' onClick={revState} />}
                <button className="circle-small margin-05vw unfold-button" onClick={unfold} />
                <div className='wbi-text-space'><h5 title={title} className='wbi-title'>{title}</h5></div>
                <div className='wbi-text-space'>
                    <h6 className='wbi-time'>
                        Start : {start}<br />
                        End : {end}
                    </h6>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="weeklyboarditem">
                {currState === 0 ? <button className='circle-small margin-05vw state-notyet' onClick={revState} /> : <button className='circle-small margin-05vw state-done-circle' onClick={revState} />}
                <button className="circle-small margin-05vw fold-button" onClick={fold} />
                <button className="circle-small margin-05vw edit-button" onClick={__showEditPage} />
                <button className="circle-small margin-05vw delete-button" onClick={__removeTodo} />
                <div className='wbi-text-space'><h5 title={title} className='wbi-title'>{title}</h5></div>
                <div className='wbi-text-space'>
                    <h6 className='wbi-time'>
                        Start : {start}<br />
                        End : {end}
                    </h6>
                </div>
            </div>
        );
    }
};

export default WeeklyBoard;