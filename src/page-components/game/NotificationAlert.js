import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import donPicture from '../../static/img/don.jpg'
import doctorPicture from '../../static/img/doctor.jpg'
import comisarPicture from '../../static/img/comisar.jpg'
import citizenPicture from '../../static/img/citizen.jpg'
import mafiaPicture from '../../static/img/mafia.jpg'


function SimpleDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className="c_dialog">
            <DialogTitle id="simple-dialog-title">Sənin Rolun
                <CloseIcon onClick={handleClose}/>
            </DialogTitle>
            <div className="c_dialog_body">

                <img src={donPicture} alt="Don" className="c_center"/>

                <p>
                    Sən donsan vəzifən mafilara rəhbırlik etmən ve blıa blab alblalaedasldjha
                </p>

            </div>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);

    // setTimeout(() => {setOpen(true)}, 1000);

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    );
}
