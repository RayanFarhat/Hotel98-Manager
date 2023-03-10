import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { readDB, type Rent } from '../database';
import { DayContext, type RoomData, type DayData } from '../Contexts/DayContext';

import './Calendar.css';

function Calendar() {
    const [date, setDate] = React.useState<Date | null>(new Date());

    // show rooms when the app starts of the current day
    React.useEffect(() => {
        setTimeout(() => onDayPressed(new Date()), 1000);
    }, []);

    const DayData = React.useContext(DayContext);

    async function onDayPressed(date: Date | null) {
        setDate(date);

        const rents = await readDB();
        if (date) {
            DayData?.updateValue(getDayRents(rents, date));
        }
    }

    function getDayRents(rents: Rent[], selectedDate: Date) {
        // if date is 7/3 5:53 then make it 8/3 00:00
        const selectedDateBegin = new Date(selectedDate);
        const selectedDateEnd = new Date(selectedDate);

        selectedDateBegin.setHours(0);
        selectedDateBegin.setMinutes(0);
        selectedDateBegin.setSeconds(0);
        selectedDateBegin.setMilliseconds(0);
        selectedDateBegin.setDate(selectedDate.getDate());

        selectedDateEnd.setHours(0);
        selectedDateEnd.setMinutes(0);
        selectedDateEnd.setSeconds(0);
        selectedDateEnd.setMilliseconds(0);
        selectedDateEnd.setDate(selectedDate.getDate() + 1); // Add 24 hours to the date

        let rooms: RoomData[] = [];

        for (let i = 0; i < rents.length; i++) {

            // check if room all day rented
            if (new Date(rents[i].fromDate) <= selectedDateBegin &&
                new Date(rents[i].toDate) >= selectedDateEnd) {
                rooms.push({
                    id: rents[i].id,
                    roomNumber: rents[i].roomNumber,
                    takers: rents[i].takers,
                    price: rents[i].price,
                    fromDate: new Date(rents[i].fromDate),
                    toDate: new Date(rents[i].toDate),
                });
            }
            //check if rent is ending this day
            else if (new Date(rents[i].toDate) < selectedDateEnd &&
                new Date(rents[i].toDate).getDate() === selectedDate.getDate()) {
                rooms.push({
                    id: rents[i].id,
                    roomNumber: rents[i].roomNumber,
                    takers: rents[i].takers,
                    fromDate: new Date(rents[i].fromDate),
                    toDate: new Date(rents[i].toDate),
                    price: rents[i].price,
                    until: new Date(rents[i].toDate)
                });
            }
            //check if rent is starting this day
            else if (new Date(rents[i].fromDate) >= selectedDateBegin &&
                new Date(rents[i].fromDate).getDate() === selectedDate.getDate()) {

                rooms.push({
                    id: rents[i].id,
                    roomNumber: rents[i].roomNumber,
                    takers: rents[i].takers,
                    price: rents[i].price,
                    fromDate: new Date(rents[i].fromDate),
                    toDate: new Date(rents[i].toDate),
                    startin: new Date(rents[i].fromDate)
                });
            }
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