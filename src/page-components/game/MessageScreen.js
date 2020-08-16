import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MessageForm from './MessageForm'
import MessageSingle from './MessageSingle'
import MessageList from './MessageList'

class MessageScreen extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <div className={"c_message_overflow"}>
                <div className={"c_civil_messages_screen"}>

                  <MessageList/>

                  <MessageForm/>

                </div>
            </div>
        );
    }
}

export default MessageScreen;
