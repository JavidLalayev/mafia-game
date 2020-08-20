import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';


class MessageScreenHeader extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <AppBar position="static" className="c_white">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <PeopleSharpIcon />
                    </IconButton>
                    <div>
                        Müzakirə yeri
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default MessageScreenHeader;
