import React, { Component } from 'react';
import './css/App.css';
import './css/bootstrap.min.css';
import Nav from './components/Nav';
import TasksPage from './tasks/Page';
import AuthPage from './auth/Page';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
    state = {};

    constructor(props) {
        super(props);

        this.state.isAuthorized = this.getIsAuthorized();
    }

    getIsAuthorized() {
        return !!Cookies.get('sid');
    }

    authChangeHandler = () => {
        const isAuthorized = this.getIsAuthorized();
        this.setState({ isAuthorized })
    }

    render() {
        return (
            <Router>
                <div>
                    <Nav isAuthorized={this.state.isAuthorized} authChangeHandler={this.authChangeHandler} />

                    <Route
                        exact path="/"
                        render={(props) => <TasksPage {...props} isAuthorized={this.state.isAuthorized} />} />

                    <Route
                        path="/tasks/"
                        render={(props) => <TasksPage {...props} isAuthorized={this.state.isAuthorized} />} />

                    <Route
                        path="/auth/"
                        render={(props) => <AuthPage {...props} isAuthorized={this.state.isAuthorized} authChangeHandler={this.authChangeHandler} />} />
                </div>
            </Router>
        );
    }
}

export default App;