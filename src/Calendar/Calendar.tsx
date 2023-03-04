import React from 'react';

import MonthDays from './MonthDays/MonthDays';

import './Calendar.css';
//Todo:
// make the calender with react-datePicker and use open prop to make it stay open

function Calendar() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


    return (
        <div className="calendar">
            <div className="header">
                <h1>February 2023</h1>
            </div>

            <div className="days-of-week">
                {daysOfWeek.map((day) => (
                    <div className="day-of-week" key={day}>
                        {day}
                    </div>
                ))}
            </div>

            <MonthDays />
        </div>
    );
}

export default Calendar;