import React from 'react';



import './RoomsList.css';
import RoomsCard from './RoomCard/RoomCard';

function RoomsList() {
    return (
        <div className="roomsList">
            <RoomsCard
                roomNumber={1}
                takers='two couples'
                price={550}
            />
            <RoomsCard
                roomNumber={2}
                takers='family two couples and 4 children'
                price={700}
            />
        </div>

    );
}


export default RoomsList;