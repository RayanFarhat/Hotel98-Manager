import React, { useEffect } from 'react';

import Calendar from './Calendar/Calendar';
import RoomsList from './RoomsList/RoomsList';
import MonthContextComponent from './Contexts/MonthContext';
import DayContextComponent from './Contexts/DayContext';

import './App.css';
import { createDB } from './database';
import AddRentCard from './AddRentCard/AddRentCard';


function App() {

  useEffect(() => {
    createDB();
  }, []);

  return (
    <MonthContextComponent>
      <DayContextComponent>
        <div className="App">
          <h1 className='title'>Hotel 98 Manager</h1>
          <Calendar />
          <AddRentCard />
          <RoomsList />
        </div>
      </DayContextComponent>
    </MonthContextComponent>
  );
}

export default App;
