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

const dateToInt = (date) => {
    return ((date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate());
};

const intToString = (date) => {
    return (parseInt(date / 10000) + "-" + parseInt((date % 10000) / 100) + "-" + (date % 100));
};

const __oneMonthBefore = (date) => {
    var dt = new Date(intToString(date));
    dt.setDate(dt.getDate()-1);
    return dateToInt(dt);
};

const __oneMonthAfter = (date) => {
    var dt = new Date(intToString(date));
    dt.setDate(dt.getDate()+1);
    return dateToInt(dt);
};

const MonthlyBoard = ({showEditPage}) => {
    const today = new Date();
    const [focusedDate, setFocusedDate] = useState(dateToInt(today));
    const [rmFlag, setRmFlag] = useState(0);

    const loadTodolist = () => {
        return sampleData;
    }
    
    const removeTodo = (id) => {
        setRmFlag(rmFlag + 1);
    };

    return (
        <div className="monthlyboard">
            <div className='mb-head'>
                <div className='flex-cell-1'><button className='rectangle-small-10-1 align-center margin-05vw'>Previous Month</button></div>
                <div className='flex-cell-1'><button className='rectangle-small-4-1 align-center margin-05vw'>2022-11</button></div>
                <div className='flex-cell-1'><button className='rectangle-small-10-1 align-center margin-05vw'>Next Month</button></div>
            </div>
            <div className='mb-body'>
                <div id="mb-row0" className='mb-row'>
                    <div id="mb-cell00" className='mb-cell'>
                        <div className='mb-cell-head'>
                            <button className='rectangle-small-4-1 align-center margin-05vw'>10-30</button>
                        </div>
                        {loadTodolist().map((todoitem) => (
                            <MonthlyBoardItem key={todoitem.id} showEditPage={showEditPage} removeTodo={removeTodo} id={todoitem.id} title={todoitem.title} start={todoitem.start} end={todoitem.end} state={todoitem.state} />
                        ))}
                    </div>
                    <div id="mb-cell01" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell02" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell03" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell04" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell05" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell06" className='mb-cell'>
                        
                    </div>
                </div>
                <div id="mb-row1" className='mb-row'>
                    <div id="mb-cell10" className='mb-cell'>

                    </div>
                    <div id="mb-cell11" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell12" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell13" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell14" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell15" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell16" className='mb-cell'>
                        
                    </div>
                </div>
                <div id="mb-row2" className='mb-row'>
                    <div id="mb-cell20" className='mb-cell'>

                    </div>
                    <div id="mb-cell21" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell22" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell23" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell24" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell25" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell26" className='mb-cell'>
                        
                    </div>
                </div>
                <div id="mb-row3" className='mb-row'>
                    <div id="mb-cell30" className='mb-cell'>

                    </div>
                    <div id="mb-cell31" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell32" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell33" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell34" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell35" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell36" className='mb-cell'>
                        
                    </div>
                </div>
                <div id="mb-row4" className='mb-row'>
                    <div id="mb-cell40" className='mb-cell'>

                    </div>
                    <div id="mb-cell41" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell42" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell43" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell44" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell45" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell46" className='mb-cell'>
                        
                    </div>
                </div>
                <div id="mb-row5" className='mb-row'>
                    <div id="mb-cell50" className='mb-cell'>

                    </div>
                    <div id="mb-cell51" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell52" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell53" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell54" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell55" className='mb-cell'>
                        
                    </div>
                    <div id="mb-cell56" className='mb-cell'>
                        
                    </div>
                </div>
            </div>
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
            <div className="monthlyboarditem">
                {currState === 0 ? <button className='circle-small margin-05vw state_notyet' onClick={revState} /> : <button className='circle-small margin-05vw state_done' onClick={revState}>&#10003;</button>}
                <button className="circle-small margin-05vw floating-right" onClick={unfold}>...</button>
                <div className='mbi-text-space'><h5 title={title} className='mbi-title'>{title}</h5></div>
            </div>
        );
    }
    else {
        return (
            <div className="monthlyboarditem">
                {currState === 0 ? <button className='circle-small margin-05vw state_notyet' onClick={revState} /> : <button className='circle-small margin-05vw state_done' onClick={revState}>&#10003;</button>}
                <button className="circle-small margin-05vw floating-right" onClick={fold}>&#9650;</button>
                <div className='flex-row'>
                    <div className='flex-cell-1'><button className="rectangle-small-2-1 margin-05vw align-center" onClick={__showEditPage}>Edit</button></div>
                    <div className='flex-cell-1'><button className="rectangle-small-2-1 margin-05vw align-center" onClick={__removeTodo}>Remove</button></div>
                </div>
                <div className='mbi-text-space'><h5 title={title} className='mbi-title'>{title}</h5></div>
                <div className='mbi-text-space'><h6 className='mbi-time'>{start.substring(11)} ~ {end.substring(11)}</h6></div>
            </div>
        );
    }
};

export default MonthlyBoard;