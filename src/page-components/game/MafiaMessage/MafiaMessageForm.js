import React, { useContext, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import {myDataContext} from "../../../Store";
import socket from "../../../services/socketIOService";

let timeOut;

export default function () {

    const [value, setValue] = useState("");
    const [typing, setTyping] = useState(false);
    const [myData] = useContext(myDataContext);

    function sendMessage() {
        if (!value.includes("<script>")){
            if (value !== ""){
                socket.emit("mafia_message_send", {sender: myData.username, msg: value, pictureUrl: myData.pictureUrl, socketId: myData.mySocketId});
                setValue("");
            }
        }else{
            alert("Sındırmaqa çalışma!");
        }
    }

    function handleChange(e) {
        setValue(e.target.value);
    }

    const timeoutFunction = () => {
        setTyping(false);
        socket.emit("mafiaNoLongerWriting", {id: myData.mySocketId, username: myData.username, pictureUrl: myData.pictureUrl});
    };

    function onKeyDownNotEnter(e){

        if (e.keyCode === 13){
            sendMessage();
        }else{
            if(!typing) {
                setTyping(true);
                socket.emit("mafiaOnWriting", {id: myData.mySocketId, username: myData.username, pictureUrl: myData.pictureUrl});
                timeOut = setTimeout(timeoutFunction, 1000);
            } else {
                socket.emit("mafiaOnWriting", {id: myData.mySocketId, username: myData.username, pictureUrl: myData.pictureUrl});
                clearTimeout(timeOut);
                timeOut = setTimeout(timeoutFunction, 1000);
            }
        }
    }

    return (
        <div className="c_message_form">

            <TextField className="c_left c_input c_br_4 c_input_padding"
                       id="outlined-basic"
                       value={value}
                       onChange={handleChange}
                       onKeyUp={onKeyDownNotEnter}
                       variant="outlined" />

            <Button
                className="c_civil_message_send_button c_mafia_message_send_button"
                onClick={sendMessage}
                variant="contained">
                <Icon style={{color: "white"}}>send</Icon>
            </Button>
        </div>
    );

}
