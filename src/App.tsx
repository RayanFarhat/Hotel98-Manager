import React, { useEffect } from 'react';

import Calendar from './Calendar/Calendar';
import RoomsList from './RoomsList/RoomsList';
import MonthContextComponent from './Contexts/MonthContext';
import DayContextComponent from './Contexts/DayContext';

import './App.css';
import { createDB } from './database';


function App() {

  useEffect(() => {
    console.log("aaaaa");

    createDB()
  }, []);

  return (
    <MonthContextComponent>
      <DayContextComponent>
        <div className="App">
          <Calendar />
          <RoomsList />
        </div>
      </DayContextComponent>
    </MonthContextComponent>
  );
}

export default App;
