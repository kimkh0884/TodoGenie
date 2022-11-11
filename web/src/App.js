import React, { useState } from 'react';
import './App.css';

const App = ({name}) => {
  return (
    <div>
      <Topbar />
      <Menubar />
      <Counter />
    </div>
  );
};

const Topbar = () => {
  return (
    <div id="to-do-genie-top-bar">
      <h1>To-do Genie</h1>
    </div>
  );
};

const Menubar = () => {
  return (
    <div id="to-do-genie-menu-bar">
      <button class="menu-button">Add</button>
      <button>All Done</button>
      <button>Refresh</button>
    </div>
  );
};

const Searchbar = () => {
  return (
    <div id="to-do-genie-search-bar">
      <h1>To-do Genie</h1>
    </div>
  );
};

const TodoTable = () => {
  return (
    <div id="to-do-genie-table">
      <h1>To-do Genie</h1>
    </div>
  );
};

const Counter = () => {
  const [number, setNumber] = useState(0);

  function incrementCnt(e) {
    setNumber((number) => number + 1);
  }

  return (
    <div>
      <h2>Count = {number}</h2>
      <button onClick={incrementCnt}>Click</button>
    </div>
  );
};

export default App;
