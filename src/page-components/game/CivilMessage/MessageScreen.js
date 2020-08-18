import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MessageForm from './MessageForm'
import MessageList from './MessageList'
import MessageScreenHeader from "./MessageScreenHeader";

class MessageScreen extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <div className={["c_message_overflow", "c_civil_list_screen_image"].join(" ")}>
                <div className={"c_civil_messages_screen"}>

                    <MessageScreenHeader/>

                    <MessageList/>

                    <MessageForm/>

                </div>
            </div>
        );
    }
}

export default MessageScreen;
