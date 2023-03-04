import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './AddRentCard.css';

function AddRentCard() {
    const [clicked, setClicked] = React.useState(true);

    function onCardClick() {
        if (clicked)
            setClicked(false);
        else
            setClicked(true);
    }

    return (
        <div className='addRent'>

            <h4 className='addRentTitle' onClick={onCardClick} >Add new rent</h4>

            {clicked ? <Form /> : ''}
        </div>
    );


}

//Todo:
// make other fields -- Done
// read the database and check if the room already rented
// add the data to the database


function Form() {
    const [roomNumber, setRoomNumber] = React.useState(1);
    const [price, setPrice] = React.useState(550);
    const [takers, setTakers] = React.useState('');

    const [fromDate, setfromDate] = React.useState<Date | null>(new Date());
    const [toDate, settoDate] = React.useState<Date | null>(new Date());

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Name:', takers);
        console.log('fromDate:', fromDate);
        console.log('toDate:', toDate);
    }

    return (
        <form className='cardForm' onSubmit={handleSubmit}>

            <label className='labelTitle' htmlFor="roomnumberpicker">Room Number</label>
            <div className="number-picker">
                {[...Array(8)].map((_, i) => (
                    <button
                        key={i + 1}
                        type="button"
                        className={roomNumber == i + 1 ? 'active' : ''}
                        onClick={() => setRoomNumber(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <input id='roomnumberpicker' type="hidden" name="number" value={roomNumber} onChange={(event) => setRoomNumber(parseInt(event.target.value))} />
            </div>

            <label className='labelTitle' htmlFor="pricenumberpicker">Price</label>
            <div className="price-picker">
                <input
                    id='pricenumberpicker'
                    type="number"
                    min="0"
                    step="50"
                    max="20000"
                    value={price}
                    onChange={(event) => setPrice(parseInt(event.target.value))}
                />
                <span>Shekel</span>
            </div>

            <label className='labelTitle' htmlFor="takers">The Takers</label>
            <input className='cardInput' type="text" id="takers" value={takers} onChange={(event) => setTakers(event.target.value)} />

            <label className='labelTitle' htmlFor="fromDate">From Date</label>
            <DatePicker
                id="fromDate"
                dateFormat="dd/MM/yyyy h:mm aa"
                selected={fromDate}
                onChange={(date) => setfromDate(date)}
                timeInputLabel="Time:"
                showTimeSelect
                wrapperClassName="date-picker"
                calendarClassName="date-picker"
            />

            <label className='labelTitle' htmlFor="toDate">To Date</label>
            <DatePicker
                id="toDate"
                dateFormat="dd/MM/yyyy h:mm aa"
                selected={toDate}
                onChange={(date) => settoDate(date)}
                timeInputLabel="Time:"
                showTimeSelect
                wrapperClassName="date-picker"
                calendarClassName="date-picker"
            />



            <button className='addCardBtn' type="submit">Add</button>
        </form>
    );
}


export default AddRentCard;
