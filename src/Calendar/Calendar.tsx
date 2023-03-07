import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './Calendar.css';

//todo
// check if the month variable is changed,if yes then read the database and get rents and insert them to context

function Calendar() {
    const [date, setDate] = React.useState<Date | null>(new Date());
    const handleMonthChange = (date: Date) => {
        console.log("Month changed to:", date.getMonth());
    };
    return (
        <div className="calendar">
            <DatePicker
                wrapperClassName="date-calendar"
                calendarClassName="date-calendar"
                popperPlacement="bottom-start"

                selected={date}
                onChange={(date) => setDate(date)}
                onMonthChange={handleMonthChange}
                open />
        </div>
    );
}

export default Calendar;