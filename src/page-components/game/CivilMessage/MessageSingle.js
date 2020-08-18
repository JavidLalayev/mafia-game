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
            (this.state.cond) ?
                <div className={"message_single"} style={{marginTop: "0px"}}>
                    <Avatar style={{marginRight: "4px", marginTop: "4px"}} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <div className={"c_message_field"}>
                        asdasd sadsd asdas  asdasdasasd  asdasd asd asdas asdasdas
                    </div>
                </div>
                :
                <div className="message_single c_message_single" style={{marginRight: "7px"}}>
                    <div className={"c_message_field_me"}>
                        asdasd sadsd asdas  asdasdasasd  asdasd asd asdas asdasdas
                    </div>
                </div>
        );
    }


}

export default MessageSingle;
