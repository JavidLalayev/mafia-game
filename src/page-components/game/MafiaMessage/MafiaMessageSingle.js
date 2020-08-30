import React, { useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {myDataContext} from "../../../Store";

export default function (props) {
    const [myData] = useContext(myDataContext);


    return (
        <div>
            {
                (props.msg.socketId !== myData.mySocketId) ?
                    <div className={"message_single"}>
                        <Avatar style={{marginRight: "4px", marginTop: "4px"}} alt={ props.msg.sender } src={ props.msg.pictureUrl } />
                        <div className={"c_message_field"} style={{color: "white", backgroundColor: "#8B0000"}}>
                            <span className="c_message_sender">{ props.msg.sender }</span>
                            <br/>
                            { props.msg.msg }
                        </div>
                    </div>
                    :
                    <div className="message_single c_message_single">
                        <div className={"c_message_field_me"} style={{color: "white", backgroundColor: "#8B0000"}}>
                            { props.msg.msg }
                        </div>
                    </div>
            }
        </div>
    );
}
