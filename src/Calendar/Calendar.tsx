import React from 'react';



import './Calendar.css';

function Calendar() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysOfMonth = [];
    for (let i = 1; i <= 31; i++) {
        daysOfMonth.push(i);
    }

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
            <div className="days-of-month">
                {daysOfMonth.map((day) => (
                    <div className="day-of-month" key={day}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Calendar;