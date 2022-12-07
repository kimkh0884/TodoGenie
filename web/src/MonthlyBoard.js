import React, {useState, useEffect} from 'react';
import { loadTodo, editTodo, deleteTodo } from './api';
import "./all.css";

const dateToInt = (date) => {
    return ((date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate());
};

const intToYYYYMM = (dtint) => {
    return (parseInt(dtint / 10000) + "-" + parseInt((dtint % 10000) / 100));
};

const intToMMDD = (dtint) => {
    return (parseInt((dtint % 10000) / 100) + "-" + (dtint % 100));
};

const intToString = (date) => {
    return (parseInt(date / 10000) + "-" + parseInt((date % 10000) / 100) + "-" + (date % 100));
};

const daysOfMonth = (date) => {
    let month = date.getMonth();

    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            return 31;
        
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;
        
        case 1:
            let year = date.getFullYear;
            if (year % 4 === 0) {
                if (year % 100 === 0 && year % 400 !== 0) {
                    return 29;
                }
                else {
                    return 28;
                }
            }
            else {
                return 28;
            }
        
        default:
            return 0;
    }
};

const startOfWeek = (date) => {
    let dow = date.getDay();
    date.setDate(date.getDate() - dow);
    return date;
};

const startOfMonth = (date) => {
    date.setDate(1);
    return date;
};

let numOfRows = 0;

const calcNumOfRows = (focusedDate) => {
    let dt = new Date(intToString(focusedDate));
    let dow = dt.getDay();
    let days = daysOfMonth(dt);

    if (dow + days <= 28) {
        numOfRows = 4;
    }
    else if (dow + days <= 35) {
        numOfRows = 5;
    }
    else {
        numOfRows = 6;
    }
};

let focusedDates = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]];

const fillFocusedDates = (focusedDate) => {
    let dt = new Date(intToString(focusedDate));
    dt = startOfWeek(dt);

    for (let i = 0; i < numOfRows; ++i) {
        for (let j = 0; j < 7; ++j) {
            focusedDates[i][j] = dateToInt(dt);
            dt.setDate(dt.getDate() + 1);
        }
    }
};

const MonthlyBoard = ({showEditPage}) => {
    const today = new Date();
    const [focusedDate, setFocusedDate] = useState(dateToInt(startOfMonth(today)));

    calcNumOfRows(focusedDate);
    fillFocusedDates(focusedDate);
    useEffect(() => {
        calcNumOfRows(focusedDate);
        fillFocusedDates(focusedDate);
    }, [focusedDate]);

    const oneMonthBefore = () => {
        let dt = new Date(intToString(focusedDate));
        dt.setMonth(dt.getMonth()-1);
        setFocusedDate(dateToInt(dt));
    };

    const oneMonthAfter = () => {
        let dt = new Date(intToString(focusedDate));
        dt.setMonth(dt.getMonth()+1);
        setFocusedDate(dateToInt(dt));
    };

    if (numOfRows === 4) {
        return (
            <div className="monthlyboard">
                <div className='mb-head'>
                    <div className='flex-cell-1'><button className='rectangle-10-1 align-center margin-05vw' onClick={oneMonthBefore}>Previous Month</button></div>
                    <div className='flex-cell-1'><button className='rectangle-4-1 align-center margin-05vw'>{intToYYYYMM(focusedDate)}</button></div>
                    <div className='flex-cell-1'><button className='rectangle-10-1 align-center margin-05vw' onClick={oneMonthAfter}>Next Month</button></div>
                </div>
                <div className='mb-body'>
                    <div id="mb-head" className='mb-row'>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Sun</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Mon</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Tue</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Wed</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Thr</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Fri</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Sat</button></div>
                    </div>
                    <div id="mb-row0" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[0][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row1" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[1][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row2" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[2][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row3" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[3][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][6]} showEditPage={showEditPage} />
                    </div>
                </div>
            </div>
        );
    }
    else if (numOfRows === 5) {
        return (
            <div className="monthlyboard">
                <div className='mb-head'>
                    <div className='flex-cell-1'><button className='rectangle-10-1 align-center margin-05vw' onClick={oneMonthBefore}>Previous Month</button></div>
                    <div className='flex-cell-1'><button className='rectangle-4-1 align-center margin-05vw'>{intToYYYYMM(focusedDate)}</button></div>
                    <div className='flex-cell-1'><button className='rectangle-10-1 align-center margin-05vw' onClick={oneMonthAfter}>Next Month</button></div>
                </div>
                <div className='mb-body'>
                    <div id="mb-head" className='mb-row'>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Sun</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Mon</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Tue</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Wed</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Thr</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Fri</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Sat</button></div>
                    </div>
                    <div id="mb-row0" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[0][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row1" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[1][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row2" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[2][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row3" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[3][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row4" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[4][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][6]} showEditPage={showEditPage} />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="monthlyboard">
                <div className='mb-head'>
                    <div className='flex-cell-1'><button className='rectangle-10-1 align-center margin-05vw' onClick={oneMonthBefore}>Previous Month</button></div>
                    <div className='flex-cell-1'><button className='rectangle-4-1 align-center margin-05vw'>{intToYYYYMM(focusedDate)}</button></div>
                    <div className='flex-cell-1'><button className='rectangle-10-1 align-center margin-05vw' onClick={oneMonthAfter}>Next Month</button></div>
                </div>
                <div className='mb-body'>
                    <div id="mb-head" className='mb-row'>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Sun</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Mon</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Tue</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Wed</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Thr</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Fri</button></div>
                        <div className='mb-body-head'><button className='rectangle-small-2-1 align-center margin-05vw'>Sat</button></div>
                    </div>
                    <div id="mb-row0" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[0][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[0][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row1" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[1][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[1][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row2" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[2][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[2][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row3" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[3][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[3][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row4" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[4][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[4][6]} showEditPage={showEditPage} />
                    </div>
                    <div id="mb-row5" className='mb-row'>
                        <MonthlyBoardCell date={focusedDates[5][0]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[5][1]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[5][2]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[5][3]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[5][4]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[5][5]} showEditPage={showEditPage} />
                        <MonthlyBoardCell date={focusedDates[5][6]} showEditPage={showEditPage} />
                    </div>
                </div>
            </div>
        );
    }
};

const MonthlyBoardCell = ({date, showEditPage}) => {
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
    };
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
        <div className='mb-cell'>
            <div className='mb-cell-head'>
                <button className='rectangle-small-4-1 align-center margin-05vw'>{intToMMDD(date)}</button>
            </div>
            {todoList.map((todoitem) => (
                <MonthlyBoardItem key={todoitem._id} showEditPage={showEditPage} removeTodo={removeTodo} id={todoitem._id} title={todoitem.title} start={todoitem.start} end={todoitem.end} state={todoitem.state} />
            ))}
        </div>
    );
};
  
const MonthlyBoardItem = ({showEditPage, removeTodo, id, title, start, end, state}) => {
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
        showEditPage(id);
    };

    const __removeTodo = () => {
        removeTodo(id);
    };

    if (moreFlag === 0) {
        return (
            <div className="monthlyboarditem">
                {currState === 0 ? <button className='circle-small margin-05vw state-notyet' onClick={revState} /> : <button className='circle-small margin-05vw state-done-circle' onClick={revState} />}
                <button className="circle-small margin-05vw unfold-button" onClick={unfold} />
                <div className='mbi-text-space'><h5 title={title} className='mbi-title'>{title}</h5></div>
            </div>
        );
    }
    else {
        return (
            <div className="monthlyboarditem">
                {currState === 0 ? <button className='circle-small margin-05vw state-notyet' onClick={revState} /> : <button className='circle-small margin-05vw state-done-circle' onClick={revState} />}
                <button className="circle-small margin-05vw fold-button" onClick={fold} />
                <button className="circle-small margin-05vw edit-button" onClick={__showEditPage} />
                <button className="circle-small margin-05vw delete-button" onClick={__removeTodo} />
                <div className='mbi-text-space'><h5 title={title} className='mbi-title'>{title}</h5></div>
                <div className='mbi-text-space'>
                    <h6 className='mbi-time'>
                        Start : {start}<br />
                        End : {end}
                    </h6>
                </div>
            </div>
        );
    }
};

export default MonthlyBoard;