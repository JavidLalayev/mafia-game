import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mats: []
        }
    }



    componentDidMount() {
        this.rendererSupport();
    }

    rendererSupport = () => {
        switch(this.props.content) {
            case 'SMALL_CONTENT':
            case 'THIRD_PARTY_CONTENT':
                this.setState(() => { return { mats: [ Math.floor(Math.random() * (80 - 60) + 60) + "%" ] } })
                break;
            case 'MEDIUM_CONTENT':
                let a = [];
                for(let ma = 0; ma < 3; ma++) {
                    a.push(Math.floor(Math.random() * (80 - 60) + 60) + "%");
                }
                this.setState(() => {
                    return {
                        mats: a
                    }
                });
                break;
        }
    }

    renderer = () => {
        switch(this.props.content) {
            case 'SMALL_CONTENT':
                return(
                    <React.Fragment>
                        <div className="chat-message-av">
                            <div className="chat-message-av-avatar"
                                 style={{ background: this.props.avatar }}
                            />
                        </div>
                        <div className="chat-message-co">
                            <div className="chat-message-co-basinf">
                                <div className="chat-message-co-basinf-name"
                                     style={{ background: this.props.name }}
                                />
                                <div className="chat-message-co-basinf-date" />
                            </div>
                            <div className="chat-message-co-mat"
                                 style={{ width: this.state.mats[0] }}
                            />
                        </div>
                    </React.Fragment>
                );
                break;
            case 'MEDIUM_CONTENT':
                return(
                    <React.Fragment>
                        <div className="chat-message-av">
                            <div className="chat-message-av-avatar"
                                 style={{ background: this.props.avatar }}
                            />
                        </div>
                        <div className="chat-message-co">
                            <div className="chat-message-co-basinf">
                                <div className="chat-message-co-basinf-name"
                                     style={{ background: this.props.name }}
                                />
                                <div className="chat-message-co-basinf-date" />
                            </div>
                            <div className="chat-message-co-mat"
                                 style={{ width: this.state.mats[0] }}
                            />
                            <div className="chat-message-co-mat"
                                 style={{ width: this.state.mats[1] }}
                            />
                            <div className="chat-message-co-mat"
                                 style={{ width: this.state.mats[2] }}
                            />
                        </div>
                    </React.Fragment>
                );
                break;
            case 'THIRD_PARTY_CONTENT':
                return(
                    <React.Fragment>
                        <div className="chat-message-av">
                            <div className="chat-message-av-avatar"
                                 style={{ background: this.props.avatar }}
                            />
                        </div>
                        <div className="chat-message-co">
                            <div className="chat-message-co-basinf">
                                <div className="chat-message-co-basinf-name"
                                     style={{ background: this.props.name }}
                                />
                                <div className="chat-message-co-basinf-date" />
                            </div>
                            <div className="chat-message-co-mat"
                                 style={{ width: this.state.mats[0] }}
                            />
                            <div className="chat-message-co-ext">
                                <div className="chat-message-co-ext-sym"></div>
                                <div className="chat-message-co-ext-co">
                                    <div className="chat-message-co-ext-co-mes" />
                                    <div className="chat-message-co-ext-co-img" />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
                break;
        }
    }

    render() {
        return(
            <div className="chat-message">
                { this.renderer() }
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
                    }, 1000)
                )
            }
        });
    };

    stopLoop = () => {
        // clearInterval(this.state.loop);
    };

    addMessage = () => {
        let colors = [
                "red",
                "orange",
                "blue",
                "purple",
                "rebeccapurple",
                "lightgreen",
                "blueviolet",
                "tomato"
            ],
            diapason = [6000, 400],
            content = [
                "SMALL_CONTENT",
                "MEDIUM_CONTENT",
                "THIRD_PARTY_CONTENT"
            ]
        let a = Math.floor(Math.random() * (diapason[0] - diapason[1]) + diapason[1]),
            b = { content: "", colors: { avatar: "", name: "" } };
        for(let ma = 0; ma < Object.keys(b.colors).length; ma++) {
            b[Object.keys(b.colors)[ma]] = colors[Math.floor(Math.random() * colors.length)];
        }
        b.content = content[Math.floor(Math.random() * content.length)];

        setTimeout(() => {
            this.setState(state => ({
                messages: [...state.messages, b]
            }), () => console.log(this.state.messages));
        }, a);

        { // XXX
            if(this.state.messages.length < 100) return false;
            // let xa = this.state.messages;
            // xa.splice(0, 7);
            this.setState(() => {
                return { messages: [] }
            });
        }
    }

    render() {
        return(
            <div className={"c_game_screen"}>
                <div className={"messages_screen"}>
                    <div className="chat">
                        {
                            this.state.messages.map(({ avatar, name, content }, index) => {
                                return(
                                    <Message
                                        key={index}
                                        avatar={ avatar }
                                        name={ name }
                                        content={ content }
                                    />
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




