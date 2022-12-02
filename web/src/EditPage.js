import React, {useState} from 'react';
import { loadTodo, addTodo, editTodo } from './api';

const getTodoProperties = (data) => {
  if (data.id === -1) {
    return ({
      id: -1,
      title: "",
      start: "",
      end: "",
      state: 0
    });
  }
  else {
    return data;
  }
};

const EditPage = ({showDailyBoard, showWeeklyBoard, showMonthlyBoard, prevBoard, data}) => {
  const todo_properties = getTodoProperties(id);
  const [doneFlag, setDoneFlag] = useState(todo_properties.state);

  const exitWithoutSave = () => {
    if (window.confirm("Do you want to exit the editor without save?")) {
      if (prevBoard === 0) {
        showDailyBoard();
      }
      else if (prevBoard === 1) {
        showWeeklyBoard();
      }
      else {
        showMonthlyBoard();
      }
    }
  };

  const saveAndExit = () => {
    if (window.confirm("Do you want to save the contents?")) {
      let res = null;
      let title = document.getElementById("ep-title").value;
      let start = document.getElementById("ep-start").value;
      let end = document.getElementById("ep-end").value;
      console.log(title);
      console.log(start);
      console.log(end);
      if (todo_properties.id === -1) {
        res = addTodo(title, start, end);

        if (res) {
          window.alert("Successfully added.");
          if (prevBoard === 0) {
            showDailyBoard();
          }
          else if (prevBoard === 1) {
            showWeeklyBoard();
          }
          else {
            showMonthlyBoard();
          }
        }
        else {
          window.alert("Adding a to-do is failed.");
        }
      }
      else {
        res = editTodo(todo_properties.id, title, start, end, doneFlag);

        if (res) {
          window.alert("Successfully editted.");
          if (prevBoard === 0) {
            showDailyBoard();
          }
          else if (prevBoard === 1) {
            showWeeklyBoard();
          }
          else {
            showMonthlyBoard();
          }
        }
        else {
          window.alert("Editting the to-do is failed.");
        }
      }
    }
  };

  const revState = () => {
    if (doneFlag === 0) {
      setDoneFlag(1);
    }
    else {
      setDoneFlag(0);
    }
  };

  if (todo_properties.id === -1) {
    return (
      <div className = "editpage">
        <MenuBar exitWithoutSave={exitWithoutSave} saveAndExit={saveAndExit} />
        <div className='align-center margin-1vw'>
          <button className='rectangle-4-1'>Title</button>
          <input id="ep-title" className='rectangle-10-1 margin-left-1vw padding-both-1vw' defaultValue={todo_properties.title} />
        </div>
        <div className='align-center margin-1vw'>
          <button className='rectangle-4-1'>Start</button>
          <input id="ep-start" type="datetime-local" className='rectangle-10-1 margin-left-1vw padding-both-1vw' defaultValue={todo_properties.start} />
        </div>
        <div className='align-center margin-1vw'>
          <button className='rectangle-4-1'>End</button>
          <input id="ep-end" type="datetime-local" className='rectangle-10-1 margin-left-1vw padding-both-1vw' defaultValue={todo_properties.end} />
        </div>
      </div>
    );
  }
  else {
    return (
      <div className = "editpage">
        <MenuBar exitWithoutSave={exitWithoutSave} saveAndExit={saveAndExit} />
        <div className='align-center margin-1vw'>
          <button className='rectangle-4-1'>Title</button>
          <input id="ep-title" className='rectangle-10-1 margin-left-1vw padding-both-1vw' defaultValue={todo_properties.title} />
        </div>
        <div className='align-center margin-1vw'>
          <button className='rectangle-4-1'>Start</button>
          <input id="ep-start" type="datetime-local" className='rectangle-10-1 margin-left-1vw padding-both-1vw' defaultValue={todo_properties.start} />
        </div>
        <div className='align-center margin-1vw'>
          <button className='rectangle-4-1'>End</button>
          <input id="ep-end" type="datetime-local" className='rectangle-10-1 margin-left-1vw padding-both-1vw' defaultValue={todo_properties.end} />
        </div>
        <div className='align-center margin-1vw'>
          <button className='rectangle-4-1'>State</button>
          {(doneFlag === 1) ? <button className='rectangle-10-1 margin-left-1vw padding-both-1vw state-done' onClick={revState}>Done</button> : <button className='rectangle-10-1 margin-left-1vw padding-both-1vw state-notyet' onClick={revState}>Not yet</button>}    
        </div>
      </div>
    );
  }
};

const MenuBar = ({exitWithoutSave, saveAndExit}) => {
  return (
    <div className="menubar flex-row">
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={exitWithoutSave}>Cancel</button></div>
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={saveAndExit}>Save</button></div>
    </div>
  );
};

export default EditPage;