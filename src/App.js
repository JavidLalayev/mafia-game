import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./App.css";
import { Route } from "react-router-dom";
import Game from "./pages/Game";

class App extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <div>

                {/*<Route path="/" component={Game}/>*/}

                <Route path="/game" component={Game} exact/>

            </div>
        );
    }
}

export default App;

