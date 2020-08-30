import React, {useContext, useEffect, useState} from 'react';
import MessageSingle from "./MessageSingle";
import SomeOneWritingMessage from "./SomeOneWritingMessage";
import ScrollToBottom from 'react-scroll-to-bottom';
import socket from "../../../services/socketIOService";
import {newMessageContext} from "../../../Store";



export default function MessageList() {
    const [isFirst, setCond] = useState(true);
    const [chatStorage, setChatStorage] = useState([]);
    const [writers, setWriters] = useState([]);
    const [newMessage, setNewMessage] = useContext(newMessageContext);
    const [value, setValue] = useContext(newMessageContext);


    socket.off("global_message_send");
    socket.on("global_message_send", ({ sender, msg, pictureUrl, socketId, writers}) => {
        setWriters(writers);
        setChatStorage(
            [...chatStorage, { sender: sender, msg: msg, pictureUrl: pictureUrl, socketId: socketId}]
        );

        // if (value !== 1){
        //     setNewMessage(true);
        // }else{
        //     setNewMessage(false);
        // }
        console.log(value);

    });

    socket.off("someoneWriting");
    socket.on("someoneWriting", (writers) => {
        setWriters(writers);
    });

    useEffect(() => {
        if (isFirst){
            socket.emit("wantGlobalMessages");

            socket.on("global_chat_messages", (global_chat_storage) => {
                setChatStorage(global_chat_storage);
            });
            setCond(false);
        }
    }, []);


    return (
        <ScrollToBottom className="c_message_list_screen c_civil_list_screen_image c_civil_list_screen_height">
                {
                    chatStorage.map((msg, index) => <MessageSingle key={index} msg={msg}/>)
                }

                {
                    writers.map((item, index) => <SomeOneWritingMessage key={index} item={item}/>)
                }
        </ScrollToBottom >
    );
}
