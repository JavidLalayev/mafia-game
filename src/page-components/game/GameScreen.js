import React, {Component, useContext, useEffect, useState} from 'react';
import Night from './Night';
import SingleMessage from './SingleMessage';
import ScrollToBottom from 'react-scroll-to-bottom';
import socket from "../../services/socketIOService";
import {
    amIMafiaContext,
    DayContext,
    gameContext,
    liveContext,
    myDataContext,
    userTypesContext
} from "../../Store";
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
    const [amIMafia, setMafia] = useContext(amIMafiaContext);
    const [myData] = useContext(myDataContext);
    const [amIDie, setMyLive] = useContext(liveContext);
    const [isGameStart, setGame] = useContext(gameContext);
    const [userTypes, setUserTypes] = useContext(userTypesContext);

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
    socket.on("dayChange", ({players, deadPlayers, game_info, isDay}) => {
        if (isGameStart){


            setUserTypes({...userTypes, players: players, deadPlayers: deadPlayers});


            if (!players.some(player => player.id === myData.mySocketId)){
                setMyLive(true);
            }
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

    socket.off("isGameStart");
    socket.on('isGameStart', (isGameStart) => {
       setGame(isGameStart)
    });

    socket.off("gameFinish");
    socket.on("gameFinish", ({game_info}) => {

        setUserTypes({...userTypes, players:[], spectator:[], deadPlayers: []});

        let index = 0;
        const interval = setInterval(() => {
            addMessage(game_info[index]);
            if (index === game_info.length - 1){
                clearInterval(interval);
            }
            index++;
        }, 2000);

    });

    socket.off("gameStart");
    socket.on("gameStart", () => {
        setMyLive(false);
        setGame(true);
        setState([]);
        setUserTypes({...userTypes, deadPlayers: []});
    });

    socket.off("executeMessages");
    socket.on("executeMessages", ({ game_info }) => {

        let index = 0;

        const interval = setInterval(() => {
            addMessage(game_info[index]);
            if (index === game_info.length - 1){
                clearInterval(interval);
            }
            index++;
        }, 2000);

    });

    return(
        <ScrollToBottom className={"c_game_screen"}>

            {
                !isDay && myData.myRole === ROLES.civil && isGameStart?
                    <Night/> : ""
            }

            {
                myData.username === "Cavid" ? <button onClick={start}>Başla</button> : ""
            }

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
                        isMafiaChoose && isGameStart ? <MafiaChoose players={playersForMafias}/> : ""
                    }

                    {
                        isDoctorChoose && isGameStart? <DoctorChoose players={players}/> : ""
                    }

                    {
                        isComisarChoose && isGameStart ? <ComisarChoose players={players}/> : ""
                    }

                    {
                        isPlayerChoose && isGameStart ? <PlayerChoose players={players}/> : ""
                    }

                </div>
            </div>

        </ScrollToBottom>
    );

}




