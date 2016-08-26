import React from 'react';

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

export default Card;