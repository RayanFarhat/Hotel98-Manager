import React from 'react';



import './MonthDays.css';
import { MonthContext } from '../../App';

function MonthDays() {
    const daysOfMonth = [];
    for (let i = 1; i <= 31; i++) {
        daysOfMonth.push(i);
    }
    const value = React.useContext(MonthContext);
    console.log(value);


    return (
        <div className="days-of-month">
            {daysOfMonth.map((day) => (
                <div className="day-of-month" key={day} onClick={onDayClick}>
                    {day}
                </div>
            ))}
        </div>

    );
}

const onDayClick = () => {
    console.log("aaaaaaaaa");

}

export default MonthDays;