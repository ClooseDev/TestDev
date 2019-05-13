import React, { Component } from 'react';
import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Tasks from '../api/Tasks';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class TasksPage extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.tasks = [];
    }

    deleteAllTasksHandler = () => {
        Tasks.deleteAll().then(() => {
            this.reloadTasks();
        })
    }

    deleteTaskHandler = (id) => {
        Tasks.delete(id).then(() => {
            this.reloadTasks();
        })
    }

    addTaskHandler = (text) => {
        Tasks.add(text).then(() => {
            this.reloadTasks();
        })
    }

    editTaskHandler = (id, text) => {
        Tasks.edit(id, text).then(() => {
            this.reloadTasks();
        })
    }

    reloadTasks = () => {
        Tasks.getAll().then((tasks) => {
            this.setState({ 'tasks': tasks })
        });
    }

    componentDidMount() {
        if (this.props.isAuthorized) {
            this.reloadTasks();
        }
    }

    render() {
        let pageContent;

        if (this.props.isAuthorized) {
            pageContent = (
                <div>
                    <NewTaskForm addTaskHandler={this.addTaskHandler} />
                    <TaskList tasks={this.state.tasks} deleteTaskHandler={this.deleteTaskHandler} editTaskHandler={this.editTaskHandler} />
                </div>
            );
        } else {
            pageContent = (
                <div className="container">
                    <div className="row">
                        <div className="col col-12">
                            <h3>You need to <Link to="/auth/">authorize</Link> to access this page.</h3>
                        </div>
                    </div>  
                </div>
            )
        }

        return pageContent;
    }
}

export default TasksPage;