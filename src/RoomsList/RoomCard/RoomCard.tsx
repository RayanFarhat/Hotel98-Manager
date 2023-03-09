import React, { useState } from 'react';

import { type RoomData } from '../../Contexts/DayContext';

import './RoomCard.css';
import RoomEdit from './RoomEdit/RoomEdit';

export type RoomsCardProps = RoomData & {
    until?: Date;
    startin?: Date;
}

function RoomsCard(props: RoomsCardProps) {

    const [isEditOpen, setIsEditOpen] = useState(false);
    function openEdit() {
        setIsEditOpen(true);
    }

    function closeEdit() {
        setIsEditOpen(false);
    }

    return (
        <div className="roomsCard" >

            <h3>חדר {props.roomNumber}</h3>
            <p>הלקוחים : {props.takers}</p>
            <p>המחיר :{props.price}</p>
            {props.until && <p> עד שעה : {props.until.getHours()}:{props.until.getMinutes()}</p>}
            {props.startin && <p> משעה : {props.startin.getHours()}:{props.startin.getMinutes()}</p>}


            <RoomEdit
                data={props}
                roomNumber={props.roomNumber}
                isOpen={isEditOpen}
                closeEdit={closeEdit}
            />
            <button className="updateBtn" onClick={openEdit}>עדכון</button>

        </div>

    );
}


export default RoomsCard;