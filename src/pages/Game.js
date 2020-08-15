import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BottomNavigation from "../page-components/game/BottomNavigation";
import PlayerListToggle from "../page-components/game/PlayerListToggle";


class Game extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <div style={{height: "100vh"}}>

                <PlayerListToggle/>

                <BottomNavigation/>

            </div>
        );
    }
}

export default Game;
