import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { updateDB, readDB, removeDB, type Rent } from '../../../database';

import { dateRangesDoIntersect } from '../../../AddRentCard/AddRentCard';

import PopupMsg from '../../../shared/PopupMsg/PopupMsg';

import { type RoomsCardProps } from '../RoomCard';

import './RoomEdit.css';
//todo add upgrade to rent or delete it

type Props = {
    roomNumber: number,
    isOpen: boolean,
    closeEdit: () => void
} & { data: RoomsCardProps };

function RoomEdit(props: Props) {

    function onDelete() {
        removeDB(props.data.id);
        props.closeEdit();
    }

    return (
        <>
            {props.isOpen && (
                <div className="roomEdit">

                    <h2>Room {props.roomNumber}</h2>
                    <Form data={props.data} />
                    <div className="btnsrooms">
                        <button className="Cancel" onClick={props.closeEdit}>בַטֵל</button>
                        <button className="Delete" onClick={onDelete}>מחיקה</button>
                    </div>
                </div>
            )}
            {props.isOpen && <div className="overlay" ></div>}
        </>

    );
}

function Form({ data }: { data: RoomsCardProps }) {
    const [roomNumber, setRoomNumber] = React.useState(data.roomNumber);
    const [price, setPrice] = React.useState(data.price);
    const [takers, setTakers] = React.useState(data.takers);

    const [fromDate, setfromDate] = React.useState<Date | null>(data.fromDate);
    const [toDate, settoDate] = React.useState<Date | null>(data.toDate);

    //for show popup message
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [showFail, setShowFail] = React.useState(false);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        const rents = await readDB();

        if (fromDate && toDate) {

            // check if toDate time is before fromDate or they are the same
            if (new Date(toDate) <= new Date(fromDate) || new Date(toDate) === new Date(fromDate)) {
                console.log("dates is wrong");
                setShowFail(true);
                setTimeout(() => setShowFail(false), 1000);
                return;
            }

            for (let i = 0; i < rents.length; i++) {
                if (rents[i].roomNumber === roomNumber && rents[i].id !== data.id) {

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
                id: data.id,// here we need the id to update the rent
                roomNumber: roomNumber,
                fromDate: fromDate.toString(),
                toDate: toDate.toString(),
                price: price,
                takers: takers
            };

            await updateDB(newRent);

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

            <label className='labelTitle' htmlFor="roomnumberpicker">מספר החדר</label>
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

            <label className='labelTitle' htmlFor="pricenumberpicker">מחיר</label>
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
                <span>שקל חדש</span>
            </div>

            <label className='labelTitle' htmlFor="takers">הלקוחים</label>
            <input className='cardInput' type="text" id="takers" value={takers} onChange={(event) => setTakers(event.target.value)} />

            <label className='labelTitle' htmlFor="fromDate">מתאריך</label>
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

            <label className='labelTitle' htmlFor="toDate">לתאריך</label>
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

            <button className='addCardBtn' type="submit" onClick={handleSubmit}>עדכן</button>
            {showSuccess && <PopupMsg successMsg={true} msg='Done successfully :)' />}
            {showFail && <PopupMsg successMsg={false} msg='Failed! You did somthing wrong :(' />}

        </form>
    );
}

export default RoomEdit;