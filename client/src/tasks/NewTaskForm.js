import React, { Component } from 'react';

class NewTaskForm extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.text = '';
    }

    buttonClickHandler = () => {
        this.props.addTaskHandler(this.state.text);
        this.setState({text: ''});
    }

    inputChangeHandler = (event) => {
        this.setState({text: event.target.value});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-8 col-md-6 col-lg-4">
                        <input onChange={this.inputChangeHandler} value={this.state.text} className="form-control mr-sm-2" type="text" placeholder="Введите url пользователя Вконтакте"/>
                    </div>
                    <div className="col col-4 col-md-6 col-lg-4">
                        <button onClick={this.buttonClickHandler} className="btn btn-outline-success">Добавить</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewTaskForm;