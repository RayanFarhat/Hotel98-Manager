import React, { type ReactNode } from 'react';
import { useState } from 'react';

// save data of all the Day by getting it from the MonthContext
export const DayContext = React.createContext<DayContextType | null>(null);

// types from database
export type RoomData = {
    roomNumber: number
    takers: string,
    price: number,
    until?: Date,//if rent end in this day
    startin?: Date//if rent start this day
};
export type DayData = {
    day: number
    rooms: RoomData[]
};
////////////////////////////////////

type DayContextType = {
    value: DayData,
    updateValue: (newValue: DayData) => void
};

type Props = {
    children: ReactNode;
};

function DayContextComponent({ children }: Props) {
    const [value, setValue] = useState<DayData>({ day: 0, rooms: [] });

    const updateValue = (newValue: DayData) => {
        setValue(newValue);
    };

    return (
        <DayContext.Provider value={{ value, updateValue }}>
            {children}
        </DayContext.Provider>
    );
}

export default DayContextComponent;