import React from 'react';



import './RoomEdit.css';

type Props = {
    roomNumber: number,
    isOpen: boolean,
    closeEdit: () => void
};

function RoomEdit(props: Props) {




    return (
        <>
            {props.isOpen && (
                <div className="roomEdit">
                    <h2>Room {props.roomNumber}</h2>
                    <p>Popup content goes here.</p>

                    <button onClick={props.closeEdit}>Cancel</button>
                </div>
            )}
            {props.isOpen && <div className="overlay" ></div>}
        </>

    );
}


export default RoomEdit;