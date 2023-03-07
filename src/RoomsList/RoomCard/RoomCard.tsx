import React, { useState } from 'react';

import { type RoomData } from '../../Contexts/DayContext';

import './RoomCard.css';
import RoomEdit from './RoomEdit/RoomEdit';

function RoomsCard(props: RoomData) {
    const cardbackgroundColor = props.taken ? 'rgb(237, 210, 210)' : 'rgb(213, 235, 214)';

    const [isEditOpen, setIsEditOpen] = useState(false);
    function openEdit() {
        setIsEditOpen(true);
    }

    function closeEdit() {
        setIsEditOpen(false);
    }

    return (
        <div className="roomsCard" style={{ backgroundColor: cardbackgroundColor }}>
            {props.taken ?
                <>
                    <h3>Room {props.roomNumber}</h3>
                    <h4>The room is taken</h4>
                    <p>{props.takers}</p>
                    <p>{props.price}</p>
                </>
                :
                <>
                    <h3>Room {props.roomNumber}</h3>
                    <h4>The room is empty</h4>
                </>
            }

            <RoomEdit
                roomNumber={props.roomNumber}
                isOpen={isEditOpen}
                closeEdit={closeEdit}
            />
            <button onClick={openEdit}>Edit</button>

        </div>

    );
}


export default RoomsCard;