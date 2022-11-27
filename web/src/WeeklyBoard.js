import React, {useState, useEffect} from 'react';

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
        start: "2022-11-23 02:00",
        end: "2022-11-23 03:00",
        state: 1
    }
];

const dateToInt = (date) => {
    return ((date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate());
};

const intToString = (date) => {
    return (parseInt(date / 10000) + "-" + parseInt((date % 10000) / 100) + "-" + (date % 100));
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
    const [rmFlag, setRmFlag] = useState(0);

    const loadTodolist = (date) => {
        return sampleData;
    }
    
    const removeTodo = (id) => {
        setRmFlag(rmFlag + 1);
    };

    return (
        <div className='wb-column'>
            <div className='wb-column-head'><button className='rectangle-small-4-1 align-center margin-05vw'>{intToString(date)}</button></div>
            {loadTodolist(date).map((todoitem) => (
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
            <div className="weeklyboarditem">
                {currState === 0 ? <button className='circle-small margin-05vw state_notyet' onClick={revState} /> : <button className='circle-small margin-05vw state_done' onClick={revState}>&#10003;</button>}
                <button className="circle-small margin-05vw floating-right" onClick={unfold}>...</button>
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
                {currState === 0 ? <button className='circle-small margin-05vw state_notyet' onClick={revState} /> : <button className='circle-small margin-05vw state_done' onClick={revState}>&#10003;</button>}
                <button className="circle-small margin-05vw floating-right" onClick={fold}>&#9650;</button>
                <div className='flex-row'>
                    <div className='flex-cell-1'><button className="rectangle-small-2-1 margin-05vw align-center" onClick={__showEditPage}>Edit</button></div>
                    <div className='flex-cell-1'><button className="rectangle-small-2-1 margin-05vw align-center" onClick={__removeTodo}>Remove</button></div>
                </div>
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