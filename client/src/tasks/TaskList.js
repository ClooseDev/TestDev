import React, { Component } from 'react';
import Task from './Task';


class TaskList extends Component {
    render() {
        return (
            <div className="container">
                <div className="row" id="task-list">
                    {this.props.tasks.map((task) => {
                        return (<Task key={task._id} info={task} deleteTaskHandler={this.props.deleteTaskHandler} editTaskHandler={this.props.editTaskHandler}/>)
                    })}
                </div>
            </div>
        );
    }
}

export default TaskList;