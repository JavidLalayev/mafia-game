import React, {useContext, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {myDataContext} from "../../../Store";

export default function MessageSingle(props) {
    const [myData] = useContext(myDataContext);


    return (
        (props.msg.socketId !== myData.mySocketId) ?
            <div className={"message_single"} style={{marginTop: "0px"}}>
                <Avatar style={{marginRight: "4px", marginTop: "4px"}} alt={props.msg.sender} src={props.msg.pictureUrl} />
                <div className={"c_message_field"}>
                    <span className="c_message_sender">{ props.msg.sender }</span>
                    <br/>
                    <span style={{fontSize: "13px"}}>{ props.msg.msg }</span>
                </div>
            </div>
            :
            <div className="message_single c_message_single" style={{marginRight: "7px"}}>
                <div className={"c_message_field_me"}>
                    { props.msg.msg }
                </div>
            </div>
    );
}
