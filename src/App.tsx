import React, { useEffect } from 'react';

import Calendar from './Calendar/Calendar';
import RoomsList from './RoomsList/RoomsList';
import MonthContextComponent from './Contexts/MonthContext';
import DayContextComponent from './Contexts/DayContext';

import electron from 'electron';
import './App.css';
import { createDB } from './database';


function App() {

  useEffect(() => {
    var response = electron.ipcRenderer.sendSync('getSomething');
    console.log(response); // prints 'something'
    //createDB()
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
