import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

class MessageSingle extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {
        cond: false
    };

    render() {
        return (
            <div>
                {
                    (this.state.cond) ?
                        <div className={"message_single"}>
                            <Avatar style={{marginRight: "4px", marginTop: "4px"}} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            <div className={"c_message_field"} style={{color: "white", backgroundColor: "#8B0000"}}>
                                asdasd sadsd asdas  asdasdasasd  asdasd asd asdas asdasdas
                            </div>
                        </div>
                        :
                        <div className="message_single c_message_single">
                            <div className={"c_message_field_me"} style={{color: "white", backgroundColor: "#8B0000"}}>
                                asdasd sadsd asdas  asdasdasasd  asdasd asd asdas asdasdas
                            </div>
                        </div>
                }

                {
                    (!this.state.cond) ?
                        <div className={"message_single"}>
                            <Avatar style={{marginRight: "4px", marginTop: "4px"}} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            <div className={"c_message_field"} style={{color: "white", backgroundColor: "#8B0000"}}>
                                asdasd sadsd asdas  asdasdasasd  asdasd asd asdas asdasdas
                            </div>
                        </div>
                        :
                        <div className="message_single c_message_single">
                            <div className={"c_message_field_me"} style={{color: "white", backgroundColor: "#8B0000"}}>
                                asdasd sadsd asdas  asdasdasasd  asdasd asd asdas asdasdas
                            </div>
                        </div>
                }
            </div>
        );
    }


}

export default MessageSingle;
