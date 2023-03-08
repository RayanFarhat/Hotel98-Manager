import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { addDB, readDB, type Rent } from '../database';

import './AddRentCard.css';
import PopupMsg from '../shared/PopupMsg/PopupMsg';

function AddRentCard() {
    const [clicked, setClicked] = React.useState(false);

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


function Form() {
    const [roomNumber, setRoomNumber] = React.useState(1);
    const [price, setPrice] = React.useState(550);
    const [takers, setTakers] = React.useState('');

    const [fromDate, setfromDate] = React.useState<Date | null>(new Date());
    const [toDate, settoDate] = React.useState<Date | null>(new Date());

    //for show popup message
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [showFail, setShowFail] = React.useState(false);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        const rents = await readDB();

        if (fromDate && toDate) {

            // check if toDate time is before fromDate or they are the same
            if (new Date(toDate) <= new Date(fromDate) || new Date(toDate) == new Date(fromDate)) {
                console.log("dates is wrong");
                setShowFail(true);
                setTimeout(() => setShowFail(false), 1000);
                return;
            }

            for (let i = 0; i < rents.length; i++) {
                if (rents[i].roomNumber === roomNumber) {
                    const rowfromDate = new Date(rents[i].fromDate);
                    const rowtoDate = new Date(rents[i].toDate);
                    const newfromDate = new Date(fromDate);
                    const newtoDate = new Date(toDate);

                    // check for intersection
                    if (dateRangesDoIntersect(rowfromDate, rowtoDate, newfromDate, newtoDate)) {
                        console.log("room already rented");
                        setShowFail(true);
                        setTimeout(() => setShowFail(false), 1000);
                        return;
                    }
                }
            }

            const newRent: Rent = {
                id: 123,
                roomNumber: roomNumber,
                fromDate: fromDate.toString(),
                toDate: toDate.toString(),
                price: price,
                takers: takers
            };

            await addDB(newRent);

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 1000);
        }
        else {
            console.log("dates is not signed");
            setShowFail(true);
            setTimeout(() => setShowFail(false), 1000);
        }
    }

    return (
        <form className='cardForm'>

            <label className='labelTitle' htmlFor="roomnumberpicker">Room Number</label>
            <div className="number-picker">
                {[...Array(8)].map((_, i) => (
                    <button
                        key={i + 1}
                        type="button"
                        className={roomNumber === i + 1 ? 'active' : ''}
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

            <button className='addCardBtn' type="submit" onClick={handleSubmit}>Add</button>
            {showSuccess && <PopupMsg successMsg={true} msg='Done successfully :)' />}
            {showFail && <PopupMsg successMsg={false} msg='Failed! You did somthing wrong :(' />}

        </form>
    );
}



function dateRangesDoIntersect(fromDate1: Date, toDate1: Date, fromDate2: Date, toDate2: Date) {
    // Check if the first date range is completely before the second date range
    if (toDate1 < fromDate2 || toDate2 < fromDate1) {
        return false;
    }

    // Check if the second date range is completely before the first date range
    if (toDate2 < fromDate1 || toDate1 < fromDate2) {
        return false;
    }

    // If neither of the above conditions is true, the date ranges intersect
    return true;
}

export default AddRentCard;
