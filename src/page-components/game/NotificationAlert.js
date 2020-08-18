import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { Bounce } from "react-awesome-reveal";


function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };


    return (
        <Bounce>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Set backup account

                    <CloseIcon onClick={handleClose}/>
                </DialogTitle>
                <div className="c_dialog_body">
                    000em ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam at delectus dignissimos dolorem ea eius illum incidunt mollitia nesciunt, nisi omnis, perspiciatis quisquam rem reprehenderit sint totam voluptas voluptatem.
                </div>
            </Dialog>
        </Bounce>

    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);

    setTimeout(() => {setOpen(true)}, 1000);

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    );
}
