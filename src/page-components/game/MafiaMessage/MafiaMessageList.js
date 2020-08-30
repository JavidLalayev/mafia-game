import React, {useState} from 'react';
import MafiaMessageSingle from "./MafiaMessageSingle";
import SomeMafiaWritingMessage from "./SomeMafiaWritingMessage";
import ScrollToBottom  from 'react-scroll-to-bottom';
import socket from "../../../services/socketIOService";

export default function () {

    const [chatStorage, setChatStorage] = useState([]);
    const [writers, setWriters] = useState([]);


    socket.off("mafia_message_send");
    socket.on("mafia_message_send", ({ sender, msg, pictureUrl, socketId, writers}) => {
        setWriters(writers);
        setChatStorage(
            [...chatStorage, { sender: sender, msg: msg, pictureUrl: pictureUrl, socketId: socketId}]
        );
    });

    socket.off("mafiaWriting");
    socket.on("mafiaWriting", (writers) => {
        setWriters(writers);
    });



    return (
        <ScrollToBottom className="c_message_list_screen c_padding_5">


            {
                chatStorage.map((msg, index) => <MafiaMessageSingle key={index} msg={msg}/>)
            }

            {
                writers.map((item, index) => <SomeMafiaWritingMessage key={index} item={item}/>)
            }

        </ScrollToBottom>
    );
}
