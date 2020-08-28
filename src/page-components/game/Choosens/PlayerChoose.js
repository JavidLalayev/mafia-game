import React, {useContext, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import socket from "../../../services/socketIOService";
import {myDataContext} from "../../../Store";

export default function PlayerChoose(props) {

    const [active, setActive] = useState(-1);
    const [playerChoose, setPlayerChoose] = useState([]);
    const [myData] = useContext(myDataContext);

    socket.off("playerChooseUpdate");
    socket.on("playerChooseUpdate", (playerChoose) => {
        setPlayerChoose(playerChoose);
    });

    const handleClick = (e, id) => {
        setActive(id);
        socket.emit("socketChooseMafia", {senderId: myData.mySocketId, username: myData.username, choosenId: id});
    };

    console.log("playerss", props.players);

    return (
        <div className="chat-message">
            <div style={{flexGrow: "1"}}>
                <Grid container spacing={1}>

                    {
                        props.players.map((item, index) => {
                            if (item.id !== myData.mySocketId){
                                return <Grid key={index} item xs={6} onClick={(e) => {handleClick(e,item.id)}} className={`${active === item.id? 'c_player_active': ''}`}>
                                    <Paper className="c_paper">

                                        <Avatar className="cm-auto" alt={item.username} src={item.picture} />

                                        <div className="c_chosse_card_body">
                                            {item.username}
                                        </div>
                                    </Paper>

                                    <div className="c_choosers">

                                        {
                                            playerChoose.map(item2 => {
                                                if (item2.choosenId === item.id){
                                                    return <React.Fragment key={item2.senderId}>
                                                        <span>{ item2.username }</span>
                                                        <br/>
                                                    </React.Fragment>
                                                }
                                            })
                                        }

                                    </div>

                                </Grid>
                            }
                        })
                    }

                </Grid>
            </div>
        </div>
    );
}
