import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/IconButton';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';


class MessageScreenHeader extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <AppBar position="static" className="c_dark_green">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Icon className="fa fa-user-secret c_p_0" style={{color: "white"}}/>
                    </IconButton>
                    <Typography variant="p  ">
                        Mafiaların Məkanı
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default MessageScreenHeader;
