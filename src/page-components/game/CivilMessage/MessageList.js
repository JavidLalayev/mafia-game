import React, {useEffect, useState} from 'react';
import MessageSingle from "./MessageSingle";
import SomeOneWritingMessage from "./SomeOneWritingMessage";
import ScrollToBottom from 'react-scroll-to-bottom';
import socket from "../../../services/socketIOService";



export default function MessageList() {
    const [isFirst, setCond] = useState(true);
    const [chatStorage, setChatStorage] = useState([]);
    const [writers, setWriters] = useState([]);

    socket.off("global_message_send");
    socket.on("global_message_send", ({ sender, msg, pictureUrl, socketId}) => {
        setChatStorage(
            [...chatStorage, { sender: sender, msg: msg, pictureUrl: pictureUrl, socketId: socketId}]
        );
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
    }, [chatStorage]);

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
