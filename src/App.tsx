import React from 'react';
import { useState } from 'react';

import Calendar from './Calendar/Calendar';

import './App.css';

export const MonthContext = React.createContext<MonthContextType | null>(null);

type MonthContextType = {
  value: number[],
  updateValue: (newValue: number[]) => void
};

function App() {
  const [value, setValue] = useState<number[]>([]);

  const updateValue = (newValue: number[]) => {
    setValue(newValue);
  };

  return (
    <MonthContext.Provider value={{ value, updateValue }}>
      <div className="App">
        <Calendar />
      </div>
    </MonthContext.Provider>
  );
}

export default App;
