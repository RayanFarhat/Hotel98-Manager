import React, { type ReactNode } from 'react';
import { useState } from 'react';

import { type DayData } from './DayContext';

// save data of all the month by getting it from the database
export const MonthContext = React.createContext<MonthContextType | null>(null);

// types from database
export type MonthData = {
    month: number
    days: DayData[]
};
////////////////////////////////////

type MonthContextType = {
    value: MonthData,
    updateValue: (newValue: MonthData) => void
};

type Props = {
    children: ReactNode;
};

function MonthContextComponent({ children }: Props) {
    const [value, setValue] = useState<MonthData>({ month: 0, days: [] });

    const updateValue = (newValue: MonthData) => {
        setValue(newValue);
    };

    return (
        <MonthContext.Provider value={{ value, updateValue }}>
            {children}
        </MonthContext.Provider>
    );
}

export default MonthContextComponent;