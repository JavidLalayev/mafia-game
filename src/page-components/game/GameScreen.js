import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Night from './Night';

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="chat-message">
                asdasdasd
            </div>
        );
    }
}


class GameScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loop: null,
            messages: []
        }
    }

    componentDidMount() {
        this.startLoop();
    }

    startLoop = () => {
        this.setState(() => {
            return {
                loop: (
                    setInterval(() => {
                        this.addMessage();
                    }, 6000)
                )
            }
        });
    };

    stopLoop = () => {
        clearInterval(this.state.loop);
    };

    addMessage = () => {

        setTimeout(() => {
            this.setState(state => ({
                messages: [...state.messages, 1]
            }), () => console.log(this.state.messages));
        }, 10000);

    };

    render() {
        return(
            <div className={"c_game_screen"}>

                <Night/>

                <div className={"messages_screen"}>
                    <div className="chat">
                        {
                            this.state.messages.map((item) => {
                                return(
                                    <Message/>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }


}

export default GameScreen;




