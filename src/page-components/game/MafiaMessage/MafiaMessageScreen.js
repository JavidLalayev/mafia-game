import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MafiaMessageForm from './MafiaMessageForm'
import MafiaMessageList from './MafiaMessageList'
import MafiaMessageScreenHeader from './MafiaMessageScreenHeader'

class MessageScreen extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <div className={["c_message_overflow", "c_mafia_list_screen"].join(" ")}>
                <div className={"c_civil_messages_screen"}>

                    <MafiaMessageScreenHeader/>

                    <MafiaMessageList/>

                    <MafiaMessageForm/>

                </div>
            </div>
        );
    }
}

export default MessageScreen;
