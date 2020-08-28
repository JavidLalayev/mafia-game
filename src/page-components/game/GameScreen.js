import React, {Component, useContext, useEffect, useState} from 'react';
import Night from './Night';
import SingleMessage from './SingleMessage';
import ScrollToBottom from 'react-scroll-to-bottom';
import socket from "../../services/socketIOService";
import {amIMafiaContext, DayContext, liveContext, myDataContext} from "../../Store";
import {ROLES} from "../../Config";
import MafiaChoose from "./Choosens/MafiaChoose";
import DoctorChoose from "./Choosens/DoctorChoose";
import ComisarChoose from "./Choosens/ComisarChoose";
import PlayerChoose from "./Choosens/PlayerChoose";

const Message = (props) => {
    return(
        <div className="chat-message">
            <SingleMessage message={props.message}/>
        </div>
    );
};

export default () => {

    const [messages, setState] = useState([]);
    const [isMafiaChoose, setMafiaChoose] = useState(false);
    const [isDoctorChoose, setDoctorChoose] = useState(false);
    const [isComisarChoose, setComisarChoose] = useState(false);
    const [isPlayerChoose, setPlayerChoose] = useState(false);
    const [isDay, setDay] = useContext(DayContext);
    const [amIMafia] = useContext(amIMafiaContext);
    const [myData] = useContext(myDataContext);
    const [amIDie, setMyLive] = useContext(liveContext);

    const[players, setPlayers] = useState([]);
    const[playersForMafias, setPlayersForMafias] = useState([]);

    const addMessage = (message) => {
        setState((prevState) => {
            return([...prevState,message])
        });
    };

    const start = () => {
        socket.emit("distributeUser");
    };

    socket.off("dayChange");
    socket.on("dayChange", ({players, game_info, isDay}) => {

        if (players.some(player => player.id === myData.mySocketId)){
            let index = 0;

            if(!isDay){

                setPlayerChoose(false);

                const interval = setInterval(() => {
                    addMessage(game_info[index]);
                    if (index === game_info.length - 1){
                        socket.emit("all_messages_rendered");
                        setTimeout(() => {setDay(isDay)}, 2000);
                        clearInterval(interval);
                    }
                    index++;

                }, 2000);
            }else{

                setMafiaChoose(false);
                setDoctorChoose(false);
                setComisarChoose(false);
                setDay(isDay);

                const interval = setInterval(() => {
                    addMessage(game_info[index]);
                    if (index === game_info.length - 1){
                        socket.emit("all_messages_rendered_in_day");
                        clearInterval(interval);
                    }
                    index++;
                }, 2000);
            }
        }else{
            setMyLive(true);
        }

    });

    socket.off("mafiaChoose");
    socket.on("mafiaChoose", ({message, players}) => {
        if(amIMafia){
            setTimeout(() => {
                addMessage(message);
                setTimeout(() => {
                    setPlayersForMafias(players);
                    setMafiaChoose(true);
                }, 2000);

            }, 2000);
        }
    });


    socket.off("doctorChoose");
    socket.on("doctorChoose", ({message, players}) => {
        if(myData.myRole === ROLES.doctor){
            setTimeout(() => {
                addMessage(message);
                setTimeout(() => {
                    setPlayers(players);
                    setDoctorChoose(true);
                }, 2000);

            }, 2000);
        }
    });


    socket.off("comisarChoose");
    socket.on("comisarChoose", ({message, players}) => {
        if(myData.myRole === ROLES.comisar){
            setTimeout(() => {
                addMessage(message);
                setTimeout(() => {
                    setPlayers(players);
                    setComisarChoose(true);
                }, 2000);

            }, 2000);
        }
    });


    socket.off("playerChoose");
    socket.on("playerChoose", ({message, players}) => {
        setTimeout(() => {
            addMessage(message);
            setTimeout(() => {
                setPlayers(players);
                setPlayerChoose(true);
            }, 2000);

        }, 2000);
    });



    return(
        <ScrollToBottom className={"c_game_screen"}>

            {
                !isDay && myData.myRole === ROLES.civil ?
                    <Night/> : ""
            }

            <button onClick={start}>Başla</button>

            <div className={"messages_screen"}>
                <div className="chat">
                    {
                        messages.map((item, index) => {
                            return(
                                (item.for === myData.myRole || item.for === ROLES.all || (item.for === ROLES.mafia && myData.myRole === ROLES.don)) ? <Message key={index} message={item}/> : ""
                            );
                        })
                    }

                    {
                        isMafiaChoose ? <MafiaChoose players={playersForMafias}/> : ""
                    }

                    {
                        isDoctorChoose ? <DoctorChoose players={players}/> : ""
                    }

                    {
                        isComisarChoose ? <ComisarChoose players={players}/> : ""
                    }

                    {
                        isPlayerChoose ? <PlayerChoose players={players}/> : ""
                    }

                </div>
            </div>

        </ScrollToBottom>
    );

}




