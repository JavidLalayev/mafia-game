import React, {useContext} from 'react';
import BottomNavigation from "../page-components/game/BottomNavigation";
import PlayerListToggle from "../page-components/game/PlayerListToggle";
import NotificationAlert from '../page-components/game/NotificationAlert'
import {loggingContext} from "../Store";
import {Redirect} from "react-router-dom"

export default function  Game(){

    const [loggedOn] = useContext(loggingContext);

    return (
        <div style={{height: "100vh"}}>

            {
                (!loggedOn) ? <Redirect to={"/"}/> : ""
            }

            <NotificationAlert/>

            <PlayerListToggle/>

            <BottomNavigation/>

        </div>
    );

}

