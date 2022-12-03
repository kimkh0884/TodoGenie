import React, {useState} from 'react';
import { searchTodo, editTodo, deleteTodo } from './api';
import "./all.css";

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

const SearchedBoard = ({showEditPage, keyword}) => {
    const [rmFlag, setRmFlag] = useState(0);

    const loadTodolist = () => {
        let res = searchTodo(keyword);
        if (res == null) {
            return sampleData;
        }
        else {
            return res;
        }
    };

    const removeTodo = (id) => {
        let res = deleteTodo(id);
        if (res) {
            setRmFlag(rmFlag + 1);
        }
        else {
            window.alert("Removing the to-do is failed.");
        }
    };
  
    return (
        <div className="searchedboard">
            <div className='db-head'>
                <div className='flex-cell-1'>
                    <button className='rectangle-10-1 align-center margin-1vw padding-both-1vw length-maintain'>Searched for "{keyword}"</button>
                </div>
            </div>
            {loadTodolist().map((todoitem) => (
                <SearchedBoardItem key={todoitem.id} showEditPage={showEditPage} removeTodo={removeTodo} id={todoitem.id} title={todoitem.title} start={todoitem.start} end={todoitem.end} state={todoitem.state} />
            ))}
        </div>
    );
};
  
const SearchedBoardItem = ({showEditPage, removeTodo, id, title, start, end, state}) => {
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
            let res = editTodo(id, title, start, end, currState);

            if (res) {
                setState(1);
            }
            else {
                window.alert("Changing the state is failed.");
            }
        }
        else {
            let res = editTodo(id, title, start, end, currState);

            if (res) {
                setState(0);
            }
            else {
                window.alert("Changing the state is failed.");
            }
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

export default SearchedBoard;