import React, { type ReactNode, useEffect } from 'react';

import './RoomsList.css';
import RoomsCard from './RoomCard/RoomCard';

import { DayContext, type RoomData, type DayData } from '../Contexts/DayContext';


function RoomsList() {

    const DayDataValue: DayData | undefined = React.useContext(DayContext)?.value;
    const cards: JSX.Element[] = [];
    if (DayDataValue) {
        for (let i = 0; i < DayDataValue.rooms.length; i++) {
            if (DayDataValue.rooms[i].until) {
                cards.push(<RoomsCard
                    key={i}
                    id={DayDataValue.rooms[i].id}//for remove from database
                    roomNumber={DayDataValue.rooms[i].roomNumber}
                    takers={DayDataValue.rooms[i].takers}
                    price={DayDataValue.rooms[i].price}
                    until={DayDataValue.rooms[i].until}
                />);
            }
            else if (DayDataValue.rooms[i].startin) {
                cards.push(<RoomsCard
                    key={i}
                    id={DayDataValue.rooms[i].id}//for remove from database
                    roomNumber={DayDataValue.rooms[i].roomNumber}
                    takers={DayDataValue.rooms[i].takers}
                    price={DayDataValue.rooms[i].price}
                    startin={DayDataValue.rooms[i].startin}
                />);
            }
            else {
                cards.push(<RoomsCard
                    key={i}
                    id={DayDataValue.rooms[i].id}//for remove from database
                    roomNumber={DayDataValue.rooms[i].roomNumber}
                    takers={DayDataValue.rooms[i].takers}
                    price={DayDataValue.rooms[i].price}
                />);
            }

        }
    }


    return (
        <div className="roomsList">
            {cards}
        </div>

    );
}


export default RoomsList;