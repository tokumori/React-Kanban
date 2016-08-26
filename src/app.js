import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import QueueColumn from './components/QueueColumn';
import InProgressColumn from './components/InProgressColumn';
import DoneColumn from './components/DoneColumn';


const Kanban = React.createClass({
  loadTasks: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    })
  },

  getInitialState: function () {
    return {data: [] }
  },

  componentDidMount: function () {
    this.loadTasks();
  },

  render: function () {
    const tasksArray = this.state.data
      .sort(function (taskA, taskB) {
        if (taskA.priority < taskB.priority) {
          return 1;
        }
        if (taskA.priority > taskB.priority) {
          return -1;
        }
        return 0;
      })
    const queue = tasksArray
      .filter(function (task) {
        return task.status_id === 1;
      });

    const inProgress = tasksArray
      .filter(function (task) {
        return task.status_id === 2;
      });
    const done = tasksArray
      .filter(function (task) {
        return task.status_id === 3;
      });
    return (
      <div className="kanban">
        <h1>Kanban</h1>
          <div className="columnContainer">
            <div className="column">
              <h2>Queue</h2>
              <QueueColumn
                data={queue}
              />
            </div>
            <div className="column">
              <h2>In Progress</h2>
              <InProgressColumn
                data={inProgress}
              />
            </div>
            <div className="column">
              <h2>Done</h2>
              <DoneColumn
                data={done}
              />
            </div>
          </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Kanban url="api/tasks" />,
  document.getElementById('app')
);