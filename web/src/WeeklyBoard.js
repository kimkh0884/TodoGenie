import React, {useState} from 'react';

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

const WeeklyBoard = ({showEditPage}) => {
    const [rmFlag, setRmFlag] = useState(0);

    const loadTodolist = () => {
        return sampleData;
    }
    
    const removeTodo = (id) => {
        setRmFlag(rmFlag + 1);
    };

    const dates_of_focused_week = [
        "2022-11-20",
        "2022-11-21",
        "2022-11-22",
        "2022-11-23",
        "2022-11-24",
        "2022-11-25",
        "2022-11-26"
    ];
    
    return (
        <div className='weeklyboard'>
            <div className='wb-head'>
                <div className='flex-cell-1'><button className='rectangle-small-10-1 align-center margin-05vw'>Previous Week</button></div>
                <div className='flex-cell-1'><button className='rectangle-small-10-1 align-center margin-05vw'>Next Week</button></div>
            </div>
            <div className="wb-body">
                <div id="wb-sun" className='wb-column'>
                    <div className='wb-column-head'><button className='rectangle-small-4-1 align-center margin-05vw'>{dates_of_focused_week[0]}</button></div>
                    {loadTodolist().map((todoitem) => (
                        <WeeklyBoardItem key={todoitem.id} showEditPage={showEditPage} removeTodo={removeTodo} id={todoitem.id} title={todoitem.title} start={todoitem.start} end={todoitem.end} state={todoitem.state} />
                    ))}
                </div>
                <div id="wb-mon" className='wb-column'>
                    <div className='wb-column-head'><button className='rectangle-small-4-1 align-center margin-05vw'>{dates_of_focused_week[1]}</button></div>
                    
                </div>
                <div id="wb-tue" className='wb-column'>
                    <div className='wb-column-head'><button className='rectangle-small-4-1 align-center margin-05vw'>{dates_of_focused_week[2]}</button></div>
                    
                </div>
                <div id="wb-wed" className='wb-column'>
                    <div className='wb-column-head'><button className='rectangle-small-4-1 align-center margin-05vw'>{dates_of_focused_week[3]}</button></div>
                    
                </div>
                <div id="wb-thr" className='wb-column'>
                    <div className='wb-column-head'><button className='rectangle-small-4-1 align-center margin-05vw'>{dates_of_focused_week[4]}</button></div>
                    
                </div>
                <div id="wb-fri" className='wb-column'>
                    <div className='wb-column-head'><button className='rectangle-small-4-1 align-center margin-05vw'>{dates_of_focused_week[5]}</button></div>
                    
                </div>
                <div id="wb-sat" className='wb-column'>
                    <div className='wb-column-head'><button className='rectangle-small-4-1 align-center margin-05vw'>{dates_of_focused_week[6]}</button></div>
                    
                </div>
            </div>
        </div>
    );
}
  
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
                <div className='wbi-text-space'><h6 className='wbi-time'>{start.substring(11)} ~ {end.substring(11)}</h6></div>
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
                <div className='wbi-text-space'><h6 className='wbi-time'>{start.substring(11)} ~ {end.substring(11)}</h6></div>
            </div>
        );
    }
};

export default WeeklyBoard;