import React from 'react';

const MainPage = () => {
  return (
    <div class = "mainpage">
      <DailyBoard />
    </div>
  );
};

const DailyBoard = () => {
  return (
    <div class = "dailyboard">
      <h1>Daily board</h1>
    </div>
  );
};

const DailyBoardItem = () => {
  return (
    <div class = "dailyboarditem">
      <h1>Daily board item</h1>
    </div>
  );
};

const WeeklyBoard = () => {
  return (
    <div class = "weeklyboard">
      <h1>Weekly board</h1>
    </div>
  );
};

const WeeklyBoardItem = () => {
  return (
    <div class = "weeklyboarditem">
      <h1>Weekly board item</h1>
    </div>
  );
};

const MonthlyBoard = () => {
  return (
    <div class = "monthlyboard">
      <h1>Monthly board</h1>
    </div>
  );
};

const MonthlyBoardItem = () => {
  return (
    <div class = "monthlyboarditem">
      <h1>Monthly board item</h1>
    </div>
  );
};

export default MainPage;
