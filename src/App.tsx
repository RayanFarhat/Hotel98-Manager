import React, { useEffect } from 'react';

import Calendar from './Calendar/Calendar';
import RoomsList from './RoomsList/RoomsList';
import DayContextComponent from './Contexts/DayContext';

import './App.css';
import { createDB, readDB, removeDB, type Rent } from './database';
import AddRentCard from './AddRentCard/AddRentCard';

function App() {

  useEffect(() => {
    createDB();
  }, []);

  // for the delete button
  async function ondeleteOldRents() {
    const rents = await readDB();
    for (let i = 0; i < rents.length; i++) {
      const toDate = new Date(rents[i].toDate);
      if (toDate < new (Date))
        removeDB(rents[i].id);
    }
  }

  return (
    <DayContextComponent>
      <div className="App">
        <h1 className='title'>Hotel 98 Manager</h1>
        <Calendar />
        <AddRentCard />
        <RoomsList />
        <button className='deleteOldRents' onClick={ondeleteOldRents}>מחיקה הזמנות שפג תוקפן</button>
      </div>
    </DayContextComponent>
  );
}

export default App;
