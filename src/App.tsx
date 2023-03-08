import React, { useEffect } from 'react';

import Calendar from './Calendar/Calendar';
import RoomsList from './RoomsList/RoomsList';
import DayContextComponent from './Contexts/DayContext';

import './App.css';
import { createDB } from './database';
import AddRentCard from './AddRentCard/AddRentCard';


function App() {

  useEffect(() => {
    createDB();
  }, []);

  return (
    <DayContextComponent>
      <div className="App">
        <h1 className='title'>Hotel 98 Manager</h1>
        <Calendar />
        <AddRentCard />
        <RoomsList />
      </div>
    </DayContextComponent>
  );
}

export default App;
