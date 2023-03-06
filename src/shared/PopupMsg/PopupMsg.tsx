import React from 'react';

import './PopupMsg.css';

type Props = {
    // handleClick: () => void,
    successMsg: boolean,
    msg: String
};

function PopupMsg(props: Props) {

    if (props.successMsg)
        return (
            <div className='successMsg'>
                {props.msg}
            </div>
        );
    else
        return (
            <div className='failMsg'>
                {props.msg}
            </div>
        );
}

export default PopupMsg;
