import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MessageSingle from "./MessageSingle";

class MessageList extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <div className={["c_message_list_screen", "c_civil_list_screen_image", "c_civil_list_screen_height"].join(" ")}>

                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>
                <MessageSingle/>


            </div>
        );
    }
}

export default MessageList;
