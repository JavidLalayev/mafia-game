import React, {Component, useContext, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import socket from "../../../services/socketIOService";
import {myDataContext} from "../../../Store";

let timeOut;


export default function MessageForm(){

    const [value, setValue] = useState("");
    const [typing, setTyping] = useState(false);
    const [myData] = useContext(myDataContext);

    function sendMessage() {
        if (!value.includes("<script>")){
            if (value !== ""){
                socket.emit("global_message_send", {sender: myData.username, msg: value, pictureUrl: myData.pictureUrl, socketId: myData.mySocketId});
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
        socket.emit("noLongerWriting", {id: myData.mySocketId, username: myData.username, pictureUrl: myData.pictureUrl});
    };

    function onKeyDownNotEnter(e){

        if (e.keyCode === 13){
            sendMessage();
        }else{
            if(!typing) {
                setTyping(true);
                socket.emit("onWriting", {id: myData.mySocketId, username: myData.username, pictureUrl: myData.pictureUrl});
                timeOut = setTimeout(timeoutFunction, 1000);
            } else {
                socket.emit("onWriting", {id: myData.mySocketId, username: myData.username, pictureUrl: myData.pictureUrl});
                clearTimeout(timeOut);
                timeOut = setTimeout(timeoutFunction, 1000);
            }
        }
    }


    return (
        <div className={"c_message_form"}>

            <TextField onKeyUp={onKeyDownNotEnter} className="c_left c_input c_input_padding"  variant="outlined" value={value} onChange={handleChange}/>

            <Button
                className={"c_civil_message_send_button"}
                onClick={sendMessage}
                variant="contained">
                <Icon style={{color: "white"}}>send</Icon>
            </Button>
        </div>
    );

}
