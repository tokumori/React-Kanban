import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

const Card = React.createClass({
  render: function () {
    const assignedTo = this.props.users.forEach((user) => {
      console.log(user.id);
      return (user.id);
    });
    return (
      <div className="card">
        <div className="task">
          <p className="taskId">Task ID: {this.props.id}</p>
          <p className="taskTitle">{this.props.title}</p>
          <p className="taskPriority">{this.props.priority}</p>
          <p className="taskCreator">Created By: {this.props.createdBy}</p>
          <p className="taskUsers">Assigned To: {assignedTo}</p>
        </div>
      </div>
    );
  }
});

const QueueColumn = React.createClass({
  render: function () {
    const queryNodes = this.props.data.map((card, index) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          priority={card.priority}
          createdBy={card.created_by}
          users={card.users}
        />
      );
    });
    return (
      <div className="queueColumn">
        {queryNodes}
      </div>
    );
  }
});

const InProgressColumn = React.createClass({
  render: function () {
    const queryNodes = this.props.data.map((card, index) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          priority={card.priority}
          createdBy={card.created_by}
          users={card.users}
        />
      );
    });
    return (
      <div className="inProgressColumn">
        {queryNodes}
      </div>
    );
  }
});

const DoneColumn = React.createClass({
  render: function () {
    var queryNodes = this.props.data.map((card, index) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          priority={card.priority}
          createdBy={card.created_by}
          users={card.users}
        />
      );
    });
    return (
      <div className="doneColumn">
        {queryNodes}
      </div>
    );
  }
});

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