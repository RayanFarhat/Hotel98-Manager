import React from 'react';



import './RoomsList.css';

function RoomsList() {
    const daysOfMonth = [];
    for (let i = 1; i <= 31; i++) {
        daysOfMonth.push(i);
    }

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

export default RoomsList;