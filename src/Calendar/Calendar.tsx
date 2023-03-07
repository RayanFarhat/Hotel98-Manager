import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { readDB, type Rent } from '../database';
import { DayContext, type RoomData, type DayData } from '../Contexts/DayContext';

import './Calendar.css';

function Calendar() {
    const [date, setDate] = React.useState<Date | null>(new Date());



    const DayData = React.useContext(DayContext);

    React.useEffect(() => {
        async function effectFunction() {
            const rents = await readDB();
        }
        effectFunction();

    }, []);

    async function onDayPressed(date: Date | null) {
        setDate(date);
        const rents = await readDB();
    }

    function getDayRents(rents: Rent[], selectedDate: Date) {
        // if date is 7/3 5:53 then make it 8/3 00:00
        const selectedDateBegin = selectedDate;
        const selectedDateEnd = selectedDate;

        selectedDateBegin.setHours(0);
        selectedDateBegin.setMinutes(0);
        selectedDateBegin.setSeconds(0);
        selectedDateBegin.setMilliseconds(0);
        selectedDateEnd.setDate(selectedDate.getDate()); // Add 24 hours to the date

        selectedDateEnd.setHours(0);
        selectedDateEnd.setMinutes(0);
        selectedDateEnd.setSeconds(0);
        selectedDateEnd.setMilliseconds(0);
        selectedDateEnd.setDate(selectedDate.getDate() + 1); // Add 24 hours to the date

        //todo
        // check time of rents if inside the day or not

        let rooms: RoomData[] = [];

        for (let i = 0; i <= rents.length; i++) {
        }

        const data: DayData = {
            day: selectedDate.getDate(),
            rooms: rooms
        };
        return data;
    }

    return (
        <div className="calendar">
            <DatePicker
                wrapperClassName="date-calendar"
                calendarClassName="date-calendar"
                popperPlacement="bottom-start"
                selected={date}
                onChange={onDayPressed}
                open />
        </div>
    );
}

export default Calendar;