import React, {Component} from 'react';
import BottomNavigation from "../page-components/game/BottomNavigation";
import PlayerListToggle from "../page-components/game/PlayerListToggle";
import NotificationAlert from '../page-components/game/NotificationAlert'

class Game extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <div style={{height: "100vh"}}>

                <NotificationAlert/>

                <PlayerListToggle/>

                <BottomNavigation/>

            </div>
        );
    }
}

export default Game;
