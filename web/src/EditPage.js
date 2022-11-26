import React from 'react';

const getTodoProperties = (todo_id) => {
  if (todo_id === -1) {
    return ({
      id: -1,
      title: "",
      start: "",
      end: "",
      state: 0
    });
  }
  else {
    return ({
      id: todo_id,
      title: "sample",
      start: "2022-11-27 13:00",
      end: "2022-11-27 15:00",
      state: 0
    });
  }
};

const EditPage = ({showDailyBoard, showWeeklyBoard, showMonthlyBoard, prevBoard, id}) => {
  const todo_properties = getTodoProperties(id);

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

  return (
    <div className = "editpage">
      <MenuBar exitWithoutSave={exitWithoutSave} saveAndExit={saveAndExit} />
      <h1>{todo_properties.id}</h1>
      <h1>{todo_properties.title}</h1>
      <h1>{todo_properties.start}</h1>
      <h1>{todo_properties.end}</h1>
      <h1>{todo_properties.state}</h1>
    </div>
  );
};

const MenuBar = ({exitWithoutSave, saveAndExit}) => {
  return (
    <div className="headpage flex-row">
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={exitWithoutSave}>Cancel</button></div>
      <div className='flex-cell-1'><button className='rectangle-8-1 margin-1vh align-center' onClick={saveAndExit}>Save</button></div>
    </div>
  );
};

export default EditPage;