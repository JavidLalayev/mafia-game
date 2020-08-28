import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import socket from "../../services/socketIOService";
import {amIMafiaContext, liveContext, myDataContext} from "../../Store";
import { ROLES } from '../../Config'

import donPicture from '../../static/img/don.jpg'
import doctorPicture from '../../static/img/doctor.jpg'
import comisarPicture from '../../static/img/comisar.jpg'
import citizenPicture from '../../static/img/citizen.jpg'
import mafiaPicture from '../../static/img/mafia.jpg'


function SimpleDialog(props) {
    const { onClose, open } = props;
    const [amIDie] = useContext(liveContext);

    let picture = "";

    switch(props.role) {
        case ROLES.mafia:
            picture = mafiaPicture;
            break;
        case ROLES.don:
            picture = donPicture;
            break;
        case ROLES.civil:
            picture = citizenPicture;
            break;
        case ROLES.comisar:
            picture = comisarPicture;
            break;
        case ROLES.doctor:
            picture = doctorPicture;
            break;
        default:
            picture = "";

    }

    const handleClose = () => {
        onClose(false);
    };

    return (
            !amIDie ?
                <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className="c_dialog">

                    <DialogTitle id="simple-dialog-title">Sənin Rolun
                        <CloseIcon onClick={handleClose}/>
                    </DialogTitle>
                    <div className="c_dialog_body">

                        <img src={picture} alt="Don" className="c_center"/>

                        <p>
                            { props.message }
                        </p>

                    </div>
                </Dialog>

                :

                <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className="c_dialog">

                    <DialogTitle id="simple-dialog-title">
                        <CloseIcon onClick={handleClose}/>
                    </DialogTitle>
                    <div className="c_dialog_body">

                        <img src={picture} alt="Don" className="c_center"/>

                        <p>
                            Siz öldünüz artıq heckəs ilə ünsiyyət qura bilməzsiniz lakin oyunu izliyə bilərsiniz
                        </p>

                    </div>
                </Dialog>

    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo(props) {

    const [open, setOpen] = React.useState(false);
    const [myMessage, setMyMessage] = React.useState("");
    const [myData, setMyData] = React.useContext(myDataContext);
    const [amIMafia, setMafia] = React.useContext(amIMafiaContext);
    const [amIDie] = useContext(liveContext);


    const handleClose = (value) => {
        setOpen(false);
    };

    socket.off("startMessages");
    socket.on("startMessages", ({start_info_storage, players}) => {

        if(players.some(item => item.id === myData.mySocketId)){
            const me = players.find(item => item.id === myData.mySocketId);
            setMyMessage(start_info_storage.find(item => item.for === me.role).content);
            setMyData({
                ...myData,
                myRole: me.role
            });

            if (me.role === ROLES.mafia || me.role === ROLES.don){
                setMafia(true);
            }else{
                setMafia(false);
            }
        }

        setOpen(true);
    });

    useEffect(() => {
        setOpen(amIDie);
    },[amIDie]);

    return (
        <div>
            <SimpleDialog open={open} onClose={handleClose} message={myMessage} role={myData.myRole}/>
        </div>
    );
}
