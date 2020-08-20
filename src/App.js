import React, {Component} from 'react';
import "./App.css";
import { Route } from "react-router-dom";
import Game from "./pages/Game";
import Login from "./pages/Login";


class App extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <div>

                <Route path="/" component={Login} exact/>
                <Route path="/login" component={Login} exact/>

                <Route path="/game" component={Game} exact/>

            </div>
        );
    }
}

export default App;

