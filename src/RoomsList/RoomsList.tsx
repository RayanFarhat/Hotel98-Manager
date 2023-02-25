import React from 'react';



import './RoomsList.css';
import RoomsCard from './RoomCard/RoomCard';

function RoomsList() {


    return (
        <div className="roomsList">
            <RoomsCard
                roomNumber={1}
                taken={true}
                takers='two couples'
                fullPrice={550}
                paidPrice={550}
            />
            <RoomsCard
                roomNumber={2}
                taken={false}
                takers='family two couples and 4 children'
                fullPrice={700}
                paidPrice={300}
            />
        </div>

    );
}


export default RoomsList;