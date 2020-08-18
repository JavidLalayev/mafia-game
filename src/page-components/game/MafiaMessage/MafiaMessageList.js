import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MafiaMessageSingle from "./MafiaMessageSingle";

class MessageList extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};


    //{/*<div className={["c_message_list_screen", "c_mafia_list_screen"].join(" ")}>*/}
    render() {
        return (

            <div className={["c_message_list_screen", "c_padding_5"].join(" ")}>

                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>
                <MafiaMessageSingle/>

            </div>
        );
    }
}

export default MessageList;
