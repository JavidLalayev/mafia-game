import React, {useContext, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import socket from "../../../services/socketIOService";
import {liveContext, myDataContext} from "../../../Store";

export default function ComisarChoose(props) {

    const [active, setActive] = useState(-1);
    const [myData] = useContext(myDataContext);
    const [amIDie] = useContext(liveContext);


    const handleClick = (e, id) => {

        if (!amIDie){
            setActive(id);
            socket.emit("socketComisarChoose", {senderId: myData.mySocketId, choosenId: id});
        }else{
            alert("Siz ölüsünüz səs verə bilməssiniz");
        }


    };

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

                                </Grid>
                            }
                        })
                    }

                </Grid>
            </div>
        </div>
    );
}
