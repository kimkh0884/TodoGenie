import React, {useState, useEffect} from 'react';
import { addTodo, editTodo, getRecommendations } from './api';
import "./all.css";

const sampleRecommendations = ["Exercise", "Homework"];

const EditPage = ({showDailyBoard, showWeeklyBoard, showMonthlyBoard, prevBoard, data}) => {
  const todo_properties = JSON.parse(data);
  const [recommendations, setRecommendations] = useState(sampleRecommendations);
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
      let title = document.getElementById("ep-title").value;
      let start = document.getElementById("ep-start").value;
      let end = document.getElementById("ep-end").value;
      console.log(title);
      console.log(start);
      console.log(end);

      let success = null;
      if (prevBoard === 0) {
        success = showDailyBoard;
      }
      else if (prevBoard === 1) {
        success = showWeeklyBoard;
      }
      else {
        success = showMonthlyBoard;
      }

      if (todo_properties.id === -1) {
        addTodo(title, start, end,
          () => {
            window.alert("Successfully added.");
            success();
          },
          () => {
            window.alert("Adding a to-do is failed.");
          });
      }
      else {
        editTodo(todo_properties.id, title, start, end, doneFlag,
          () => {
            window.alert("Successfully editted.");
            success();
          },
          () => {
            window.alert("Editting the to-do is failed.");
          });
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

  const tryGetRecommendations = () => {
    getRecommendations(
      (res) => {
        setRecommendations(res);
      },
      () => {});
  };
  useEffect(tryGetRecommendations, []);

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
        <div className='align-center margin-1vw'>
          <h4 className='system-text'>※ People often adds these to-dos</h4>
          {recommendations.map((word, i) => (
            <button key={i} className='rectangle-small-10-1 margin-05vw align-center'>{word}</button>
          ))}
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