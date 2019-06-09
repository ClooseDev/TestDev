import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import User from '../api/User';

class Nav extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.authText = props.isAuthorized ? '' : 'Not authorized';
    }

    updateUserText() {
        User.getUsername()
            .then(username => {
                const authText = 'Пользователь: ' + username;
                this.setState({authText});
            })
            .catch(err => {
                console.log(err);
            });
    }

    logoutHandler = () => {
        User.logout()
            .then(res => {
                const authText = 'Not authorized';
                this.setState({authText});
                this.props.authChangeHandler();
            })
            .catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        if (this.props.isAuthorized) {
            this.updateUserText();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuthorized && !prevProps.isAuthorized) {
            this.updateUserText();
        }
    }

    render() {
        let authButtons;

        if (this.props.isAuthorized) {
            authButtons = (<button onClick={this.logoutHandler} className="btn btn-outline-danger my-2 my-sm-0" id="delete-all-button">Log Out</button>)

        } else {
            authButtons = (<Link to="/auth/"><button className="btn btn-outline-success my-2 my-sm-0" id="delete-all-button">Log In</button></Link>)
        }

        var iconStyle = {
            width: '30px'
        }
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Хранитель аккаунтов вконтакте</a>
                <img src="https://pngicon.ru/file/uploads/vk.png" alt="Иконка вк" style={iconStyle}/>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/tasks/">Список</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <span className="nav-link">{this.state.authText}</span>
                        </li>
                    </ul>
                    {authButtons}
                </div>
            </nav>
        );
    }
}

export default Nav;