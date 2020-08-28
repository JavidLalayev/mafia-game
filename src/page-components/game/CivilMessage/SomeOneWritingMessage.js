import React, {useContext, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {myDataContext} from "../../../Store";

export default function SomeOneWritingMessage(props) {
    const [myData] = useContext(myDataContext);

    return (
        (props.item.writerId !== myData.mySocketId) ?
                <div className={"message_single"} style={{marginTop: "0px"}}>
                    <Avatar style={{marginRight: "4px", marginTop: "4px"}} alt={props.item.sender} src={props.item.pictureUrl} />
                    <div className={"c_message_field"}>
                            <span style={{fontSize: "13px"}}>
                                <span style={{fontWeight: "bold"}}>{ props.item.username }</span> <br/>yazır...
                            </span>
                    </div>
                </div>
                :
                <div style={{display: "none"}}></div>
    );
}
