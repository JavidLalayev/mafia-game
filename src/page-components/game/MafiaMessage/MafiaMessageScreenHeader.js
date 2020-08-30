import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/IconButton';


class MessageScreenHeader extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <AppBar position="static" className="c_dark_green">
                <Toolbar>
                    <div style={{marginRight: "10px"}} color="inherit" aria-label="menu">
                        <Icon className="fa fa-user-secret c_p_0" style={{color: "white"}}/>
                    </div>
                    <div>
                        Mafiaların Məkanı
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default MessageScreenHeader;
